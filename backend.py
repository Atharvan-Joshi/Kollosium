import os
import sqlite3
import hashlib
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import traceback
import json
from datetime import datetime

# Environment variables load karein
load_dotenv()

# --- Database Setup ---
DATABASE = 'athletix.db'

def get_db_connection():
    """Database connection banata hai."""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Database ko initialize karta hai aur zaroori tables banata hai."""
    conn = get_db_connection()
    with conn:
        # User authentication ke liye table
        conn.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            );
        ''')
        # User ke workouts log karne ke liye table
        conn.execute('''
            CREATE TABLE IF NOT EXISTS workouts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                log_date TEXT NOT NULL,
                sport TEXT NOT NULL,
                day_of_week TEXT NOT NULL,
                workout_details TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users (id)
            );
        ''')
        # User ke fitness tests save karne ke liye table (JSON format mein)
        conn.execute('''
            CREATE TABLE IF NOT EXISTS fitness_tests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                sport TEXT NOT NULL,
                test_date TEXT NOT NULL,
                results_json TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users (id)
            );
        ''')
        # User ki personal details save karne ke liye table
        conn.execute('''
            CREATE TABLE IF NOT EXISTS user_profiles (
                user_id INTEGER PRIMARY KEY,
                dob TEXT,
                gender TEXT,
                height INTEGER,
                weight INTEGER,
                body_type TEXT,
                diet_preference TEXT,
                sport TEXT,
                FOREIGN KEY (user_id) REFERENCES users (id)
            );
        ''')
        # AI se generate kiye gaye plans save karne ke liye table
        conn.execute('''
            CREATE TABLE IF NOT EXISTS ai_plans (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                plan_date TEXT NOT NULL,
                plan_json TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users (id)
            );
        ''')
    print("Database sabhi tables ke saath initialize ho gaya hai.")

# --- Helper Functions ---
def hash_password(password):
    """Password ko store karne ke liye hash karta hai."""
    return hashlib.sha256(password.encode()).hexdigest()

def get_clean_json_from_ai(prompt):
    """AI ko prompt bhejta hai aur response ko saaf karke valid JSON banata hai."""
    if not model:
        raise ConnectionError("AI Model configured nahi hai.")
    response = model.generate_content(prompt)
    response_text = response.text.strip()
    
    if "```json" in response_text:
        response_text = response_text.split("```json")[1].split("```")[0].strip()
    
    try:
        json.loads(response_text)
        return response_text
    except json.JSONDecodeError:
        first_brace = response_text.find('{')
        last_brace = response_text.rfind('}')
        if first_brace != -1 and last_brace != -1:
            clean_text = response_text[first_brace:last_brace+1]
            json.loads(clean_text)
            return clean_text
        raise ValueError("AI response mein valid JSON nahi mila.")


# --- Flask App Initialization ---
app = Flask(__name__)
CORS(app) 

# --- AI Model Configuration ---
try:
    API_KEY = os.getenv("GEMINI_API_KEY")
    if not API_KEY:
        raise ValueError("❌ No GEMINI_API_KEY found. Please add it to your .env file")
    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash-latest")
    print("✅ Gemini AI Model safaltapoorvak configure ho gaya.")
except Exception as e:
    print(f"Error configuring Gemini: {e}")
    model = None

# --- API Endpoints ---

@app.route("/register", methods=["POST"])
def register():
    # ... (koi badlav nahi)
    try:
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not all([username, email, password]):
            return jsonify({"error": "Missing fields"}), 400

        hashed_password = hash_password(password)
        conn = get_db_connection()
        try:
            with conn:
                cursor = conn.execute(
                    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                    (username, email, hashed_password)
                )
            user_id = cursor.lastrowid
            return jsonify({"message": "User registered successfully!", "user": {"id": user_id, "username": username}}), 201
        except sqlite3.IntegrityError:
            return jsonify({"error": "Email already exists."}), 409
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@app.route("/login", methods=["POST"])
def login():
    # ... (koi badlav nahi)
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Missing email or password"}), 400

        hashed_password = hash_password(password)
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE email = ? AND password = ?', (email, hashed_password)).fetchone()
        conn.close()

        if user:
            return jsonify({"message": "Login successful!", "user": {"id": user['id'], "username": user['username']}}), 200
        else:
            return jsonify({"error": "Invalid email or password."}), 401
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route("/profile", methods=["GET", "POST"])
def profile():
    # ... (koi badlav nahi)
    try:
        user_id = request.args.get('user_id')
        if not user_id:
            return jsonify({"error": "User ID zaroori hai"}), 400
        
        conn = get_db_connection()
        
        if request.method == "POST":
            data = request.get_json()
            profile_exists = conn.execute('SELECT 1 FROM user_profiles WHERE user_id = ?', (user_id,)).fetchone()
            
            with conn:
                if profile_exists:
                    if 'weight' in data and len(data) == 1:
                         conn.execute('UPDATE user_profiles SET weight = ? WHERE user_id = ?', (data['weight'], user_id))
                    else:
                        conn.execute('''
                            UPDATE user_profiles 
                            SET dob = ?, gender = ?, height = ?, weight = ?, body_type = ?, diet_preference = ?, sport = ?
                            WHERE user_id = ?
                        ''', (data['dob'], data['gender'], data['height'], data['weight'], data['body_type'], data['diet_preference'], data['sport'], user_id))

                else:
                    conn.execute('''
                        INSERT INTO user_profiles (user_id, dob, gender, height, weight, body_type, diet_preference, sport)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    ''', (user_id, data['dob'], data['gender'], data['height'], data['weight'], data['body_type'], data['diet_preference'], data['sport']))
            
            return jsonify({"message": "Profile safaltapoorvak save ho gaya!"}), 200

        elif request.method == "GET":
            profile_cursor = conn.execute('SELECT * FROM user_profiles WHERE user_id = ?', (user_id,))
            profile_data = profile_cursor.fetchone()
            conn.close()
            if profile_data:
                return jsonify(dict(profile_data))
            else:
                return jsonify(None), 404
                
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Ek error aayi: {str(e)}"}), 500


@app.route("/generate_plan", methods=["POST"])
def generate_plan():
    # ... (koi badlav nahi)
    try:
        data = request.get_json()
        user_details = data.get("userDetails")
        analysis = data.get("analysis")
        user_id = data.get("userId")
        if not all([user_details, analysis, user_id]):
             return jsonify({"error": "Plan generation ke liye user details missing hain."}), 400
        
        prompt = f"""
        As an expert athletic trainer, create a 7-day workout plan in JSON format for the following user.
        **User Profile:**
        - Sport: {user_details.get('sport')}
        - Age: {user_details.get('age')} years
        - Fitness Analysis: {analysis.get('detailed')}.
        **Instructions:**
        1. The output MUST be a single valid JSON object with a single root key: "workout_plan".
        2. The value should be an object with keys "Monday" through "Sunday".
        3. Each day should have a string value describing the workout. Tailor it to the sport and the detailed fitness analysis. Include one rest day.
        4. Do not include any text or markdown formatting outside the JSON object.
        """
        plan_text = get_clean_json_from_ai(prompt)

        plan_date = datetime.now().strftime('%Y-%m-%d')
        conn = get_db_connection()
        with conn:
            conn.execute(
                'INSERT INTO ai_plans (user_id, plan_date, plan_json) VALUES (?, ?, ?)',
                (user_id, plan_date, plan_text)
            )

        return jsonify({"plan_text": plan_text})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"AI plan generate karne mein fail hua. {str(e)}"}), 500

@app.route("/get_latest_plan", methods=["POST"])
def get_latest_plan():
    # ... (koi badlav nahi)
    try:
        data = request.get_json()
        user_id = data.get('userId')
        if not user_id:
            return jsonify({"error": "User ID zaroori hai."}), 400
        
        conn = get_db_connection()
        plan_cursor = conn.execute('SELECT * FROM ai_plans WHERE user_id = ? ORDER BY plan_date DESC LIMIT 1', (user_id,))
        latest_plan = plan_cursor.fetchone()
        conn.close()
        
        if latest_plan:
            return jsonify(dict(latest_plan))
        else:
            return jsonify(None)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Plan fetch karne mein fail hua: {str(e)}"}), 500

@app.route("/save_test", methods=["POST"])
def save_test():
    """User ke customized fitness test results ko JSON format mein save karta hai."""
    try:
        data = request.get_json()
        user_id = data.get('userId')
        results = data.get('results')
        sport = data.get('sport')
        if not all([user_id, results, sport]):
            return jsonify({"error": "User ID, sport ya test results missing hain."}), 400
        
        test_date = datetime.now().strftime('%Y-%m-%d')
        results_json = json.dumps(results)
        
        conn = get_db_connection()
        with conn:
            conn.execute(
                'INSERT INTO fitness_tests (user_id, sport, test_date, results_json) VALUES (?, ?, ?, ?)',
                (user_id, sport, test_date, results_json)
            )
        return jsonify({"message": "Fitness test safaltapoorvak save ho gaya!"}), 201
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Test save karne mein fail hua: {str(e)}"}), 500

@app.route("/get_latest_test", methods=["POST"])
def get_latest_test():
    # ... (koi badlav nahi)
    try:
        data = request.get_json()
        user_id = data.get('userId')
        if not user_id:
            return jsonify({"error": "User ID zaroori hai."}), 400
        
        conn = get_db_connection()
        test_cursor = conn.execute('SELECT * FROM fitness_tests WHERE user_id = ? ORDER BY test_date DESC LIMIT 1', (user_id,))
        latest_test = test_cursor.fetchone()
        conn.close()
        
        if latest_test:
            return jsonify(dict(latest_test))
        else:
            return jsonify(None)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Test fetch karne mein fail hua: {str(e)}"}), 500

@app.route("/generate", methods=["POST"])
def generate_content():
    # ... (koi badlav nahi)
    if not model: return jsonify({"error": "AI Model is not configured correctly."}), 500
    try:
        data = request.get_json()
        user_prompt = data.get("prompt")
        if not user_prompt: return jsonify({"error": "Prompt is required."}), 400
        system_prompt = (
            "You are a knowledgeable AI Fitness and Nutrition Assistant. Your expertise is in Indian sports and diet. Provide helpful, concise, and safe advice."
        )
        full_prompt = f"{system_prompt}\n\nUser question: \"{user_prompt}\""
        response = model.generate_content(full_prompt)
        return jsonify({"response": response.text})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route("/log_workout", methods=["POST"])
def log_workout():
    try:
        data = request.get_json()
        user_id = data.get('userId')
        day_to_log = data.get('day_of_week')

        # Server-side validation to prevent logging future workouts
        day_map = { 'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 }
        current_day_name = datetime.now().strftime('%A')
        current_day_index = day_map[current_day_name]
        day_to_log_index = day_map.get(day_to_log)

        if day_to_log_index is None:
            return jsonify({"error": "Invalid day of the week provided."}), 400

        if day_to_log_index > current_day_index:
            return jsonify({"error": "You cannot log a workout for a future day."}), 403

        required_keys = ['log_date', 'sport', 'day_of_week', 'workout_details']
        if not all(key in data for key in required_keys):
            return jsonify({"error": "Missing data for logging workout."}), 400
        
        conn = get_db_connection()
        with conn:
            conn.execute(
                'INSERT INTO workouts (user_id, log_date, sport, day_of_week, workout_details) VALUES (?, ?, ?, ?, ?)',
                (user_id, data['log_date'], data['sport'], data['day_of_week'], data['workout_details'])
            )
        return jsonify({"message": "Workout logged successfully!"}), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Failed to log workout: {str(e)}"}), 500

@app.route("/get_progress", methods=["POST"])
def get_progress():
    # ... (koi badlav nahi)
    try:
        data = request.get_json()
        user_id = data.get('userId')
        if not user_id:
            return jsonify({"error": "User ID is required to get progress."}), 400

        conn = get_db_connection()
        workouts_cursor = conn.execute('SELECT * FROM workouts WHERE user_id = ? ORDER BY log_date DESC', (user_id,))
        workouts = [dict(row) for row in workouts_cursor.fetchall()]
        conn.close()
        return jsonify(workouts)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Failed to get progress: {str(e)}"}), 500

# Naya Endpoint: Sport ke baare mein jaankari ke liye
@app.route("/get_sport_info", methods=["POST"])
def get_sport_info():
    """AI se kisi specific sport ke baare mein jaankari generate karvata hai."""
    try:
        data = request.get_json()
        sport = data.get('sport')
        if not sport:
            return jsonify({"error": "Sport ka naam zaroori hai."}), 400
        
        prompt = f"""
        Provide a concise yet comprehensive guide for an aspiring athlete in {sport}. The guide should be structured in three sections:
        1.  **Overview**: A brief introduction to the sport.
        2.  **Key Skills**: A bulleted list of the 4-5 most crucial skills required for the sport.
        3.  **Core Strategies**: A bulleted list of 3-4 fundamental strategies for success in {sport}.
        Keep the language encouraging and easy to understand.
        """
        response = model.generate_content(prompt)
        return jsonify({"info": response.text})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Sport info generate karne mein fail hua: {str(e)}"}), 500


if __name__ == "__main__":
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)

