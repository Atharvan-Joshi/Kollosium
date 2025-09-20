import React, { useState, useEffect, useRef, useContext } from 'react';

// --- Bhasha (Language) Setup ---
const translations = {
    en: {
        loading: "Loading...",
        kollosseum: "Kollosseum",
        tagline: "Transform Your Life",
        subTagline: "Unlock your true potential with AI-powered personal coaching that delivers real results.",
        login: "Login",
        register: "Create Account",
        loginCta: "Login to your account",
        registerCta: "Create an account to start",
        username: "Username",
        email: "Email",
        password: "Password",
        noAccount: "Don't have an account?",
        haveAccount: "Already have an account?",
        registerHere: "Register here",
        loginHere: "Login here",
        clientsTransformed: "Clients Transformed",
        yearsExperience: "Years Experience",
        successRate: "Success Rate",
        support: "Support",
        contactUs: "Contact us: contact@kollosseum.fit",
        welcomeBack: "Welcome back,",
        profileLoading: "Loading your profile data...",
        welcomeToKollosseum: "Welcome to Kollosseum!",
        createProfilePrompt: "Create your profile to get started.",
        home: "Home",
        myPlan: "My Plan",
        aboutMySport: "About My Sport",
        healthTools: "Health Tools",
        profile: "Profile",
        progress: "Progress",
        logout: "Logout",
        homeTitle: "Dashboard Home",
        homeDescription: "Here you can get an overview of your fitness journey. To generate a new plan, go to the My Plan section.",
        createMyPlan: "Create My Plan",
        planCheck: "Checking for your plan...",
        planDisplayTitle: "Your AI-Generated Plan",
        startOver: "Generate New Plan",
        planHomeTitle: "Generate Your New Plan",
        planHomeDescription: "Get a personalized plan to boost your performance.",
        startFitnessTest: "Start Fitness Test",
        testCheck: "Checking for previous test data...",
        recentTestHint: "Hint: Your last test is recent, but you must take a new test to generate a new plan.",
        oldTestHint: "Your last test is more than 7 days old. For best results, take the test again.",
        aboutSportTitle: "About",
        loadingInfo: "Loading information...",
        infoError: "Could not retrieve information.",
        connectError: "Could not connect to the server.",
        yourProfile: "Your Profile",
        updateWeight: "Update Weight",
        cancel: "Cancel",
        profileSaved: "Profile saved successfully!",
        profileSaveFailed: "Failed to save profile.",
        anErrorOccurred: "An error occurred.",
        dob: "Date of Birth",
        gender: "Gender",
        height: "Height",
        weight: "Weight",
        bodyType: "Body Type",
        dietPreference: "Diet Preference",
        selectSport: "Select Your Primary Sport",
        saveChanges: "Save Changes",
        age: "Age",
        diet: "Diet",
        fitnessTestTitle: "Fitness Test",
        fitnessTestPrompt: "Enter your current bests in these exercises to tailor your plan.",
        back: "Back",
        analyzeAndPlan: "Analyze & Generate Plan",
        analysis: "Fitness Analysis",
        analysisUnavailable: "Analysis data is not available.",
        detailedFeedback: {
            excellent: "Excellent",
            good: "Good",
            needsImprovement: "Needs Improvement"
        },
        dietPlan: "Diet Plan",
        dietPlanUnavailable: "Sorry, a diet plan is not available for your selections.",
        workoutPlan: "Workout Plan",
        generatingPlan: "Coach Gemini is creating your unique workout...",
        planGenFailed: "Failed to generate plan.",
        aiConnectError: "Could not connect to the AI service.",
        log: "LOG",
        logged: "LOGGED!",
        logWorkoutFailed: "Failed to log workout.",
        logConnectError: "Could not connect to server to log workout.",
        progressLog: "My Progress Log",
        loadingProgress: "Loading progress...",
        noWorkoutsLogged: "No workouts have been logged yet!",
        bmiCalculator: "BMI Calculator",
        bmiInfo: "Based on your profile height ({height}cm) and weight ({weight}kg).",
        bmiProfileError: "Height and weight are required in your profile to calculate BMI.",
        underweight: "Underweight",
        normalWeight: "Normal weight",
        overweight: "Overweight",
        obesity: "Obesity",
        calorieIntake: "Daily Calorie Intake",
        activityLevel: "Activity Level",
        maintenanceCalories: "Maintenance Calories:",
        profileDataNeeded: "Profile data needed.",
        calorieBurn: "Calorie Burn Estimator",
        activity: "Activity",
        duration: "Duration (minutes)",
        estimatedBurn: "Estimated Calories Burned:",
        aiAssistant: "AI Fitness Assistant",
        chatDefault: "Hi! Ask me for a desi meal idea, or ask a question about exercises.",
        thinking: "Thinking...",
        chatError: "Sorry, I couldn't get a response.",
        chatConnectError: "Error connecting to the AI assistant.",
        typeMessage: "Type a message...",
        aboutUsTitle: "About Kollosseum",
        aboutUsText: "Kollosseum is not just an app; it's your personal AI companion dedicated to crafting a unique and effective fitness journey just for you. We believe in the power of personalized data and cutting-edge technology to help you achieve your peak performance."
    },
    hi: {
        loading: "लोड हो रहा है...",
        kollosseum: "Kollosseum",
        tagline: "अपना जीवन बदलें",
        subTagline: "एआई-संचालित व्यक्तिगत कोचिंग के साथ अपनी वास्तविक क्षमता को अनलॉक करें जो वास्तविक परिणाम देता है।",
        login: "लॉग इन करें",
        register: "अकाउंट बनाएं",
        loginCta: "अपने अकाउंट में लॉग इन करें",
        registerCta: "शुरू करने के लिए एक अकाउंट बनाएं",
        username: "उपयोगकर्ता नाम",
        email: "ईमेल",
        password: "पासवर्ड",
        noAccount: "अकाउंट नहीं है?",
        haveAccount: "पहले से ही एक अकाउंट है?",
        registerHere: "यहां रजिस्टर करें",
        loginHere: "यहां लॉग इन करें",
        clientsTransformed: "क्लाइंट्स बदले",
        yearsExperience: "वर्षों का अनुभव",
        successRate: "सफलता दर",
        support: "समर्थन",
        contactUs: "हमसे संपर्क करें: contact@kollosseum.fit",
        welcomeBack: "वापस स्वागत है,",
        profileLoading: "आपकी प्रोफ़ाइल डेटा लोड हो रही है...",
        welcomeToKollosseum: "Kollosseum में आपका स्वागत है!",
        createProfilePrompt: "शुरू करने के लिए अपनी प्रोफ़ाइल बनाएं।",
        home: "होम",
        myPlan: "मेरा प्लान",
        aboutMySport: "मेरे खेल के बारे में",
        healthTools: "स्वास्थ्य उपकरण",
        profile: "प्रोफ़ाइल",
        progress: "प्रगति",
        logout: "लॉग आउट",
        homeTitle: "डैशबोर्ड होम",
        homeDescription: "यहां आप अपनी फिटनेस यात्रा का अवलोकन कर सकते हैं। एक नया प्लान बनाने के लिए, मेरा प्लान अनुभाग पर जाएं।",
        createMyPlan: "मेरा प्लान बनाएं",
        planCheck: "आपके प्लान की जाँच हो रही है...",
        planDisplayTitle: "आपका एआई-जनित प्लान",
        startOver: "नया प्लान बनाएं",
        planHomeTitle: "अपना नया प्लान बनाएं",
        planHomeDescription: "अपने प्रदर्शन को बेहतर बनाने के लिए एक व्यक्तिगत प्लान प्राप्त करें।",
        startFitnessTest: "फिटनेस टेस्ट शुरू करें",
        testCheck: "पिछले टेस्ट डेटा की जाँच हो रही है...",
        recentTestHint: "संकेत: आपका पिछला टेस्ट हाल का है, लेकिन एक नया प्लान बनाने के लिए आपको एक नया टेस्ट देना होगा।",
        oldTestHint: "आपके पिछले टेस्ट को 7 दिन से अधिक हो गए हैं। बेहतर परिणामों के लिए, टेस्ट दोबारा दें।",
        aboutSportTitle: "के बारे में",
        loadingInfo: "जानकारी लोड हो रही है...",
        infoError: "जानकारी प्राप्त नहीं की जा सकी।",
        connectError: "सर्वर से कनेक्ट नहीं किया जा सका।",
        yourProfile: "आपकी प्रोफ़ाइल",
        updateWeight: "वजन अपडेट करें",
        cancel: "रद्द करें",
        profileSaved: "प्रोफ़ाइल सफलतापूर्वक सहेजा गया!",
        profileSaveFailed: "प्रोफ़ाइल सहेजने में विफल।",
        anErrorOccurred: "एक त्रुटि हुई।",
        dob: "जन्म तिथि",
        gender: "लिंग",
        height: "ऊंचाई",
        weight: "वजन",
        bodyType: "शरीर का प्रकार",
        dietPreference: "आहार वरीयता",
        selectSport: "अपना प्राथमिक खेल चुनें",
        saveChanges: "बदलाव सहेजें",
        age: "आयु",
        diet: "आहार",
        fitnessTestTitle: "फिटनेस टेस्ट",
        fitnessTestPrompt: "अपने प्लान को अनुकूलित करने के लिए इन अभ्यासों में अपना वर्तमान सर्वश्रेष्ठ दर्ज करें।",
        back: "वापस",
        analyzeAndPlan: "विश्लेषण करें और प्लान बनाएं",
        analysis: "फिटनेस विश्लेषण",
        analysisUnavailable: "विश्लेषण डेटा उपलब्ध नहीं है।",
        detailedFeedback: {
            excellent: "उत्कृष्ट",
            good: "अच्छा",
            needsImprovement: "सुधार की आवश्यकता है"
        },
        dietPlan: "आहार योजना",
        dietPlanUnavailable: "माफ़ कीजिए, आपके चयन के लिए आहार योजना उपलब्ध नहीं है।",
        workoutPlan: "वर्कआउट प्लान",
        generatingPlan: "कोच जेमिनी आपका अनूठा वर्कआउट बना रहा है...",
        planGenFailed: "प्लान बनाने में विफल।",
        aiConnectError: "एआई सेवा से कनेक्ट नहीं हो सका।",
        log: "लॉग",
        logged: "लॉग किया गया!",
        logWorkoutFailed: "वर्कआउट लॉग करने में विफल।",
        logConnectError: "वर्कआउट लॉग करने के लिए सर्वर से कनेक्ट नहीं हो सका।",
        progressLog: "मेरा प्रगति लॉग",
        loadingProgress: "प्रगति लोड हो रही है...",
        noWorkoutsLogged: "अभी तक कोई वर्कआउट लॉग नहीं किया गया है!",
        bmiCalculator: "बीएमआई कैलकुलेटर",
        bmiInfo: "आपकी प्रोफ़ाइल ऊंचाई ({height}cm) और वजन ({weight}kg) के आधार पर।",
        bmiProfileError: "बीएमआई की गणना के लिए आपकी प्रोफ़ाइल में ऊंचाई और वजन आवश्यक है।",
        underweight: "कम वजन",
        normalWeight: "सामान्य वजन",
        overweight: "अधिक वजन",
        obesity: "मोटापा",
        calorieIntake: "दैनिक कैलोरी सेवन",
        activityLevel: "गतिविधि स्तर",
        maintenanceCalories: "अनुरक्षण कैलोरी:",
        profileDataNeeded: "प्रोफ़ाइल डेटा आवश्यक है।",
        calorieBurn: "कैलोरी बर्न अनुमानक",
        activity: "गतिविधि",
        duration: "अवधि (मिनट)",
        estimatedBurn: "अनुमानित कैलोरी बर्न:",
        aiAssistant: "एआई फिटनेस सहायक",
        chatDefault: "नमस्ते! मुझसे देसी भोजन का विचार या व्यायाम के बारे में कोई सवाल पूछें।",
        thinking: "सोच रहा हूँ...",
        chatError: "माफ़ कीजिए, मुझे कोई प्रतिक्रिया नहीं मिली।",
        chatConnectError: "एआई सहायक से कनेक्ट होने में त्रुटि।",
        typeMessage: "एक संदेश टाइप करें...",
        aboutUsTitle: "Kollosseum के बारे में",
        aboutUsText: "Kollosseum सिर्फ एक ऐप नहीं है; यह आपका व्यक्तिगत एआई साथी है जो सिर्फ आपके लिए एक अनूठी और प्रभावी फिटनेस यात्रा तैयार करने के लिए समर्पित है। हम आपकी चरम प्रदर्शन को प्राप्त करने में मदद करने के लिए व्यक्तिगत डेटा और अत्याधुनिक तकनीक की शक्ति में विश्वास करते हैं।"
    },
    hn: {
        loading: "Loading ho raha hai...",
        kollosseum: "Kollosseum",
        tagline: "Apni Zindagi Badlein",
        subTagline: "AI-powered personal coaching ke saath apni asli potential ko unlock karein jo sachmuch parinaam deta hai.",
        login: "Login Karein",
        register: "Account Banayein",
        loginCta: "Apne account mein login karein",
        registerCta: "Shuru karne ke liye account banayein",
        username: "Username",
        email: "Email",
        password: "Password",
        noAccount: "Account nahi hai?",
        haveAccount: "Pehle se account hai?",
        registerHere: "Yahan register karein",
        loginHere: "Yahan login karein",
        clientsTransformed: "Clients Badle",
        yearsExperience: "Saal ka Anubhav",
        successRate: "Safalta Dar",
        support: "Sahayata",
        contactUs: "Humein contact karein: contact@kollosseum.fit",
        welcomeBack: "Wapas swagat hai,",
        profileLoading: "Aapka profile data load ho raha hai...",
        welcomeToKollosseum: "Kollosseum mein aapka swagat hai!",
        createProfilePrompt: "Shuru karne ke liye apna profile banayein.",
        home: "Home",
        myPlan: "Mera Plan",
        aboutMySport: "Mere Sport ke Baare Mein",
        healthTools: "Health Tools",
        profile: "Profile",
        progress: "Progress",
        logout: "Logout",
        homeTitle: "Dashboard Home",
        homeDescription: "Yahan aap apne fitness journey ka overview dekh sakte hain. Naya plan banane ke liye, My Plan section mein jayein.",
        createMyPlan: "Mera Plan Banayein",
        planCheck: "Aapka plan check ho raha hai...",
        planDisplayTitle: "Aapka AI-Generated Plan",
        startOver: "Naya Plan Banayein",
        planHomeTitle: "Apna Naya Plan Banayein",
        planHomeDescription: "Apni performance ko behtar banane ke liye ek personalized plan prapt karein.",
        startFitnessTest: "Fitness Test Shuru Karein",
        testCheck: "Pichla test data check ho raha hai...",
        recentTestHint: "Hint: Aapka pichla test haal hi ka hai, lekin naya plan banane ke liye aapko naya test dena hoga.",
        oldTestHint: "Aapke pichle test ko 7 din se zyada ho gaye hain. Behtar parinaamo ke liye, test dobara dein.",
        aboutSportTitle: "ke Baare Mein",
        loadingInfo: "Jaankari load ho rahi hai...",
        infoError: "Jaankari prapt karne mein asamarth.",
        connectError: "Server se connect karne mein asamarth.",
        yourProfile: "Aapki Profile",
        updateWeight: "Weight Update Karein",
        cancel: "Cancel",
        profileSaved: "Profile safaltapoorvak save ho gaya!",
        profileSaveFailed: "Profile save karne mein fail hua.",
        anErrorOccurred: "Ek error aayi.",
        dob: "Janam Tithi",
        gender: "Gender",
        height: "Height",
        weight: "Weight",
        bodyType: "Body Type",
        dietPreference: "Diet Preference",
        selectSport: "Apna Primary Sport Chunein",
        saveChanges: "Changes Save Karein",
        age: "Age",
        diet: "Diet",
        fitnessTestTitle: "Fitness Test",
        fitnessTestPrompt: "Apne plan ko anukoolit karne ke liye in exercises mein apna vartaman best record karein.",
        back: "Peeche",
        analyzeAndPlan: "Analyze & Plan Banayein",
        analysis: "Fitness Analysis",
        analysisUnavailable: "Analysis data uplabdh nahi hai.",
        detailedFeedback: {
            excellent: "Behtareen",
            good: "Acha",
            needsImprovement: "Sudhar ki Zaroorat Hai"
        },
        dietPlan: "Diet Plan",
        dietPlanUnavailable: "Maaf kijiye, aapke chunav ke liye diet plan uplabdh nahi hai.",
        workoutPlan: "Workout Plan",
        generatingPlan: "Coach Gemini aapka unique workout bana raha hai...",
        planGenFailed: "Plan generate karne mein fail hua.",
        aiConnectError: "AI service se connect nahi ho saka.",
        log: "LOG",
        logged: "LOGGED!",
        logWorkoutFailed: "Workout log karne mein fail hua.",
        logConnectError: "Workout log karne ke liye server se connect nahi ho saka.",
        progressLog: "Mera Progress Log",
        loadingProgress: "Progress load ho raha hai...",
        noWorkoutsLogged: "Abhi tak koi workout log nahi kiya gaya!",
        bmiCalculator: "BMI Calculator",
        bmiInfo: "Aapke profile ke height ({height}cm) aur weight ({weight}kg) ke aadhar par.",
        bmiProfileError: "Aapka BMI calculate karne ke liye profile mein height aur weight zaroori hai.",
        underweight: "Kam Vajan",
        normalWeight: "Normal Vajan",
        overweight: "Zyada Vajan",
        obesity: "Motaapa",
        calorieIntake: "Daily Calorie Intake",
        activityLevel: "Activity Level",
        maintenanceCalories: "Maintenance Calories:",
        profileDataNeeded: "Profile data zaroori hai.",
        calorieBurn: "Calorie Burn Estimator",
        activity: "Activity",
        duration: "Duration (minutes)",
        estimatedBurn: "Anumanit Calories Burned:",
        aiAssistant: "AI Fitness Assistant",
        chatDefault: "Namaste! Mujhse desi meal ka idea ya exercise ke baare mein koi sawaal poochein.",
        thinking: "Soch raha hoon...",
        chatError: "Maaf kijiye, mujhe response nahi mil saka.",
        chatConnectError: "AI assistant se connect hone mein error.",
        typeMessage: "Ek sandesh likhein...",
        aboutUsTitle: "Kollosseum Ke Baare Mein",
        aboutUsText: "Kollosseum sirf ek app nahi hai; yeh aapka personal AI saathi hai jo sirf aapke liye ek unique aur prabhavi fitness safar banane ke liye samarpit hai. Hum aapki peak performance haasil karne mein madad karne ke liye personalized data aur cutting-edge technology ki shakti mein vishwas karte hain."
    },
};

const LanguageContext = React.createContext();

const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const t = (key, params = {}) => {
        const keys = key.split('.');
        let result = translations[language];
        for (const k of keys) {
            result = result?.[k];
        }

        if (!result) {
            let fallback = translations['en'];
            for(const fk of keys) {
                fallback = fallback?.[fk];
            }
            if (!fallback) return key;
            result = fallback;
        }
        
        if (typeof result === 'string' && params) {
            for (const p in params) {
                result = result.replace(`{${p}}`, params[p]);
            }
        }

        return result;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Main App Component: Poore application ka state manage karega
export default function App() {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    );
}

function AppContent() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useContext(LanguageContext);

    useEffect(() => {
        try {
            const loggedInUser = sessionStorage.getItem('kollosseumUser');
            if (loggedInUser) {
                setUser(JSON.parse(loggedInUser));
            }
        } catch (error) {
            console.error("Session storage se user parse karne mein fail hua", error);
            sessionStorage.removeItem('kollosseumUser');
        }
        setIsLoading(false);
    }, []);

    const handleLoginSuccess = (userData) => {
        sessionStorage.setItem('kollosseumUser', JSON.stringify(userData));
        setUser(userData);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('kollosseumUser');
        setUser(null);
    };
    
    // Global styles for animations
    const GlobalStyles = () => (
        <style>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
                animation: fadeIn 0.5s ease-in-out;
            }
            @keyframes bounce-slow {
                0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
                50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); }
            }
            .animate-bounce-heading {
                animation: bounce-slow 1.5s infinite;
            }
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            @keyframes pulse {
                0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(240, 147, 251, 0.7); }
                70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(240, 147, 251, 0); }
                100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(240, 147, 251, 0); }
            }
        `}</style>
    );

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">{t('loading')}</div>;
    }

    return (
        <>
            <GlobalStyles />
            <div className="text-white bg-gray-900">
                {user ? <MainApp user={user} onLogout={handleLogout} /> : <Auth onLoginSuccess={handleLoginSuccess} />}
            </div>
        </>
    );
}

// --- ANIMATED BACKGROUND COMPONENT ---
const AnimatedBackground = () => (
    <>
        <div className="fixed top-0 left-0 w-full h-full -z-10" style={{
            background: 'linear-gradient(-45deg, #000000, #4d0000, #ff0000, #000000)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 15s ease infinite',
        }}></div>
        <div className="fixed top-[20%] left-[10%] w-24 h-24 bg-red-900 rounded-full -z-10 opacity-20" style={{ animation: 'float 8s ease-in-out infinite -2s' }}></div>
        <div className="fixed top-[60%] right-[10%] w-36 h-36 bg-red-800 rounded-full -z-10 opacity-20" style={{ animation: 'float 10s ease-in-out infinite -4s' }}></div>
    </>
);


// --- AUTHENTICATION COMPONENT ---
function Auth({ onLoginSuccess }) {
    const [isLoginView, setIsLoginView] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { t } = useContext(LanguageContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);
        const data = Object.fromEntries(new FormData(event.target).entries());
        const endpoint = `http://127.0.0.1:5000/${isLoginView ? 'login' : 'register'}`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                onLoginSuccess(result.user);
            } else {
                setError(result.error || t('anErrorOccurred'));
            }
        } catch (err) {
            setError(t('connectError'));
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="relative min-h-screen bg-gray-900 overflow-y-auto">
            <AnimatedBackground />
            <header className="absolute top-0 left-0 right-0 p-4 text-center">
                 <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 15px rgba(255, 0, 0, 0.4))' }}>
                    {t('kollosseum')}
                </h1>
            </header>
            <main className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 gap-8 pt-20">
                <div className="md:w-1/2 text-center md:text-left animate-fadeIn">
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">{t('tagline')}</h2>
                    <p className="text-xl text-gray-400">{t('subTagline')}</p>
                </div>
                <div className="w-full max-w-md bg-black/20 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl animate-fadeIn" style={{animationDelay: '0.2s'}}>
                    <h3 className="text-2xl font-bold mb-6 text-center">{isLoginView ? t('loginCta') : t('registerCta')}</h3>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {!isLoginView && <AuthInput name="username" type="text" placeholder={t('username')} />}
                        <AuthInput name="email" type="email" placeholder={t('email')} />
                        <AuthInput name="password" type="password" placeholder={t('password')} />
                        {error && <p className="text-red-400 text-sm h-4">{error}</p>}
                        <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold py-3 rounded-full transition-all duration-300 disabled:opacity-50 transform hover:scale-105" style={{animation: 'pulse 2s infinite'}}>
                            {loading ? 'Processing...' : (isLoginView ? t('login') : t('register'))}
                        </button>
                    </form>
                    <p className="text-sm text-gray-400 mt-6 text-center">
                        {isLoginView ? t('noAccount') : t('haveAccount')}
                        <button onClick={() => setIsLoginView(!isLoginView)} className="ml-1 font-semibold text-red-400 hover:text-red-300 transition-colors">
                            {isLoginView ? t('registerHere') : t('loginHere')}
                        </button>
                    </p>
                </div>
            </main>
             <section className="w-full p-8 text-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    <AnimatedStatCard number="500+" label={t('clientsTransformed')} />
                    <AnimatedStatCard number="5+" label={t('yearsExperience')} />
                    <AnimatedStatCard number="95%" label={t('successRate')} />
                    <AnimatedStatCard number="24/7" label={t('support')} />
                </div>
            </section>
            <section className="w-full p-8 text-center max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold mb-4">{t('aboutUsTitle')}</h3>
                <p className="text-gray-400">{t('aboutUsText')}</p>
            </section>
            <footer className="w-full p-4 text-center text-gray-500 text-sm">
                <p>&copy; 2025 {t('kollosseum')}. All rights reserved.</p>
                <p>{t('contactUs')}</p>
            </footer>
        </div>
    );
}

const AnimatedStatCard = ({ number, label }) => {
    const [count, setCount] = useState(0);
    const target = parseInt(number.replace(/\D/g, ''));
    const suffix = number.replace(/\d/g, '');
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const duration = 2000;
                    const startTime = performance.now();

                    const animate = (currentTime) => {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        start = Math.floor(progress * target);
                        setCount(start);
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            setCount(target);
                        }
                    };
                    requestAnimationFrame(animate);
                    observer.unobserve(ref.current);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [target]);


    return (
        <div ref={ref} className="bg-white/5 p-4 rounded-lg">
            <p className="text-5xl font-bold text-red-400">{count}{suffix}</p>
            <p className="text-gray-400 mt-2">{label}</p>
        </div>
    );
};


const AuthInput = (props) => (
    <input {...props} required className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all" />
);

// --- MAIN APP (After Login) ---
function MainApp({ user, onLogout }) {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('Home');
    const { t, setLanguage, language } = useContext(LanguageContext);

    const fetchProfile = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:5000/profile?user_id=${user.id}`);
            if (response.ok) {
                const data = await response.json();
                setProfile(data);
            } else {
                setProfile(null);
            }
        } catch (error) {
            console.error("Profile fetch karne mein fail hua:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [user.id]);

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">{t('profileLoading')}</div>;
    }

    if (!profile) {
        return <ProfileCreation user={user} onProfileCreated={fetchProfile} />;
    }
    
    const pages = {
        'Home': <HomePage setCurrentPage={setCurrentPage} />,
        'My Plan': <PlanGenerator user={user} profile={profile} />,
        'About My Sport': <AboutSportPage sport={profile.sport} />,
        'Health Tools': <HealthToolsPage profile={profile} />,
        'Profile': <ProfilePage user={user} profile={profile} onProfileUpdate={fetchProfile} />,
        'Progress': <ProgressPage user={user} />
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={onLogout} />
            <div className="flex-1 p-8 ml-64">
                <header className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-4xl font-bold animate-bounce-heading">{t(currentPage.replace(/\s+/g, ''))}</h1>
                        <p className="text-gray-400">{t('welcomeBack')} {user.username}!</p>
                    </div>
                    <div className="flex gap-1 bg-gray-800 p-1 rounded-full">
                        <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-sm rounded-full ${language === 'en' ? 'bg-indigo-600' : 'hover:bg-indigo-500/50'}`}>EN</button>
                        <button onClick={() => setLanguage('hn')} className={`px-3 py-1 text-sm rounded-full ${language === 'hn' ? 'bg-indigo-600' : 'hover:bg-indigo-500/50'}`}>HN</button>
                        <button onClick={() => setLanguage('hi')} className={`px-3 py-1 text-sm rounded-full ${language === 'hi' ? 'bg-indigo-600' : 'hover:bg-indigo-500/50'}`}>HI</button>
                    </div>
                </header>
                <div className="animate-fadeIn">
                    {pages[currentPage]}
                </div>
                 <Chatbot />
            </div>
        </div>
    );
}

// --- Sidebar Navigation ---
function Sidebar({ currentPage, setCurrentPage, onLogout }) {
    const { t } = useContext(LanguageContext);
    const navItems = ['Home', 'My Plan', 'About My Sport', 'Health Tools', 'Profile', 'Progress'];
    return (
        <div className="w-64 bg-gray-900/80 backdrop-blur-sm border-r border-gray-700 p-6 flex flex-col fixed h-full">
            <h1 className="text-3xl font-bold mb-12" style={{textShadow: '0 0 8px rgba(59, 130, 246, 0.7)'}}>Koll<span className="text-red-500">o</span>sseum</h1>
            <nav className="flex flex-col space-y-4">
                {navItems.map(item => (
                    <button 
                        key={item} 
                        onClick={() => setCurrentPage(item)}
                        className={`text-left text-lg p-3 rounded-lg transition-all duration-200 ${currentPage === item ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                    >
                        {t(item.replace(/\s+/g, ''))}
                    </button>
                ))}
            </nav>
            <button onClick={onLogout} className="mt-auto text-left text-lg p-3 rounded-lg transition-all duration-200 text-gray-400 hover:bg-red-600 hover:text-white">
                {t('logout')}
            </button>
        </div>
    );
}

// --- Profile Creation (First time user) ---
function ProfileCreation({ user, onProfileCreated }) {
    const { t } = useContext(LanguageContext);
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-gray-800/70 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold mb-2 text-center text-indigo-300">{t('welcomeToKollosseum')}</h2>
                <p className="text-center text-gray-400 mb-8">{t('createProfilePrompt')}</p>
                <ProfileForm user={user} onSave={onProfileCreated} isEditing={false} />
            </div>
        </div>
    );
}

// --- Dashboard Pages ---
function HomePage({ setCurrentPage }) {
    const { t } = useContext(LanguageContext);
    return (
        <div className="bg-gray-800/70 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{t('homeTitle')}</h2>
            <p className="text-gray-300 mb-6">{t('homeDescription')}</p>
            <button onClick={() => setCurrentPage('My Plan')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105">
                {t('createMyPlan')}
            </button>
        </div>
    );
}

function PlanGenerator({ user, profile }) {
    const [page, setPage] = useState('loading'); // loading, planDisplay, planHome, test, planResult
    const [analysis, setAnalysis] = useState(null);
    const [storedPlan, setStoredPlan] = useState(null);
    const { t } = useContext(LanguageContext);
    const userDetails = { ...profile, name: user.username, age: new Date().getFullYear() - new Date(profile.dob).getFullYear() };

    useEffect(() => {
        const fetchLatestPlan = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/get_latest_plan`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.id }),
                });
                if (response.ok) {
                    const data = await response.json();
                    if(data){
                        const planData = JSON.parse(data.plan_json);
                        const analysisData = planData.analysis; // Assuming analysis is stored with plan
                        setStoredPlan(planData.workout_plan);
                        setAnalysis(analysisData);
                        setPage('planDisplay');
                    } else {
                        setPage('planHome');
                    }
                } else {
                     setPage('planHome');
                }
            } catch (err) { 
                console.error(err); 
                setPage('planHome');
            }
        };
        fetchLatestPlan();
    }, [user.id]);

    const CurrentPageComponent = {
        'loading': <p>{t('planCheck')}</p>,
        'planDisplay': <PlanPage userDetails={userDetails} analysis={analysis} user={user} onStartOver={() => setPage('planHome')} existingPlan={storedPlan} />,
        'planHome': <PlanHome user={user} onStartTest={() => setPage('test')} />,
        'test': <FitnessTest user={user} profile={profile} onTestComplete={(results, analysisResult) => { setAnalysis(analysisResult); setPage('planResult'); }} onBack={() => setPage('planHome')} />,
        'planResult': <PlanPage userDetails={userDetails} analysis={analysis} user={user} onStartOver={() => setPage('planHome')} />,
    }[page];
    
    return <div className="w-full max-w-5xl mx-auto">{CurrentPageComponent}</div>;
}

function PlanHome({ user, onStartTest }) {
     const [latestTest, setLatestTest] = useState(null);
     const [isTestLoading, setIsTestLoading] = useState(true);
     const { t } = useContext(LanguageContext);

    useEffect(() => {
        const fetchLatestTest = async () => {
            setIsTestLoading(true);
            try {
                const response = await fetch(`http://127.0.0.1:5000/get_latest_test`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.id }),
                });
                if (response.ok) {
                    setLatestTest(await response.json());
                }
            } catch (err) { console.error(err); } 
            finally { setIsTestLoading(false); }
        };
        fetchLatestTest();
    }, [user.id]);
    
    if(isTestLoading) return <p>{t('testCheck')}</p>;

    const isTestRecent = latestTest && (new Date() - new Date(latestTest.test_date)) / (1000 * 60 * 60 * 24) < 7;
    
    return (
         <div className="bg-gray-800/70 p-8 rounded-2xl shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">{t('planHomeTitle')}</h2>
            <p className="text-gray-300 mb-6">{t('planHomeDescription')}</p>
            {isTestRecent && <p className="text-green-400 mb-4">{t('recentTestHint')}</p>}
            {latestTest && !isTestRecent && <p className="text-yellow-400 mb-4">{t('oldTestHint')}</p>}
            <button onClick={onStartTest} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg">{t('startFitnessTest')}</button>
        </div>
    );
}

function AboutSportPage({ sport }) {
    const [info, setInfo] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useContext(LanguageContext);

    useEffect(() => {
        const fetchInfo = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://127.0.0.1:5000/get_sport_info', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sport: sport }),
                });
                const data = await response.json();
                if (response.ok) {
                    setInfo(data.info);
                } else {
                    setInfo(t('infoError'));
                }
            } catch (err) {
                setInfo(t('connectError'));
            }
            setIsLoading(false);
        };
        fetchInfo();
    }, [sport, t]);

    return (
        <div className="bg-gray-800/70 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{sport} {t('aboutSportTitle')}</h2>
            {isLoading ? <p>{t('loadingInfo')}</p> : 
            <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: info.replace(/\n/g, '<br />') }} />
            }
        </div>
    );
}


function ProfilePage({ user, profile, onProfileUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const { t } = useContext(LanguageContext);
    return (
        <div className="bg-gray-800/70 p-8 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{t('yourProfile')}</h2>
                <button onClick={() => setIsEditing(!isEditing)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
                    {isEditing ? t('cancel') : t('updateWeight')}
                </button>
            </div>
            {isEditing ? (
                <ProfileForm user={user} existingProfile={profile} onSave={() => { setIsEditing(false); onProfileUpdate(); }} isEditing={true} />
            ) : (
                <ProfileDetails user={user} profile={profile} />
            )}
        </div>
    );
}

// --- Reusable Profile Form ---
function ProfileForm({ user, existingProfile, onSave, isEditing }) {
    const { t } = useContext(LanguageContext);
    const [formData, setFormData] = useState({
        dob: '', gender: 'Male', height: 170, weight: 70, body_type: 'Mesomorph', diet_preference: 'Non-Vegetarian', sport: ''
    });

    useEffect(() => {
        if (existingProfile) {
            setFormData({
                dob: existingProfile.dob || '',
                gender: existingProfile.gender || 'Male',
                height: existingProfile.height || 170,
                weight: existingProfile.weight || 70,
                body_type: existingProfile.body_type || 'Mesomorph',
                diet_preference: existingProfile.diet_preference || 'Non-Vegetarian',
                sport: existingProfile.sport || ''
            });
        }
    }, [existingProfile]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSportSelect = (sport) => {
        setFormData(prev => ({ ...prev, sport }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = isEditing ? { weight: formData.weight } : formData;
        try {
            const response = await fetch(`http://127.0.0.1:5000/profile?user_id=${user.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });
            if (response.ok) {
                alert(t('profileSaved'));
                if(onSave) onSave();
            } else {
                alert(t('profileSaveFailed'));
            }
        } catch (error) {
            console.error("Profile save karne mein error:", error);
            alert(t('anErrorOccurred'));
        }
    };
    
    // SVG Icons for Sports
    const CricketIcon = () => <svg className="w-16 h-16 text-white" stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .324.263.588.588.588h.568a.588.588 0 01.588.588v.568a.588.588 0 01-.588.588h-.568a.588.588 0 01-.588-.588v-.568c0-.324-.263-.588-.588-.588h-.568a.588.588 0 01-.588-.588v-.568c0-.324.263-.588.588-.588h.568c.325 0 .588-.264.588-.588v-.568a.588.588 0 01.588-.588h.568a.588.588 0 01.588.588v.568a.588.588 0 01-.588.588h-.568a.588.588 0 01-.588-.588v-2.272a.588.588 0 01.588-.588h.568a.588.588 0 01.588.588v.568c0 .324.263.588.588.588h.568a.588.588 0 01.588.588v.568a.588.588 0 01-.588.588h-.568a.588.588 0 01-.588-.588v-.568c0-.324-.263-.588-.588-.588h-2.272a.588.588 0 01-.588-.588v-.568c0-.324.263-.588.588-.588h.568a.588.588 0 01.588.588v.568a.588.588 0 01-.588.588H9.25a.588.588 0 01-.588-.588v-.568a.588.588 0 01.588-.588h.568a.588.588 0 01.588.588v2.272c0 .324.263.588.588.588h.568a.588.588 0 01.588.588v.568a.588.588 0 01-.588.588h-.568a.588.588 0 01-.588-.588v-.568c0-.324-.263-.588-.588-.588h-.568a.588.588 0 01-.588-.588v-.568c0-.324.263-.588.588-.588h.568a.588.588 0 01.588.588zM9.25 10.35v6.528c0 .324.263.588.588.588h.568a.588.588 0 01.588.588v.568a.588.588 0 01-.588.588h-.568a.588.588 0 01-.588-.588v-.568c0-.324-.263-.588-.588-.588H9.25a.588.588 0 01-.588-.588v-6.528c0-.324.263-.588.588-.588h.568a.588.588 0 01.588.588v.568a.588.588 0 01-.588.588h-.568a.588.588 0 01-.588-.588zM12.75 10.35v6.528c0 .324.263.588.588.588h.568a.588.588 0 01.588.588v.568a.588.588 0 01-.588.588h-.568a.588.588 0 01-.588-.588v-.568c0-.324-.263-.588-.588-.588h-.568a.588.588 0 01-.588-.588v-6.528c0-.324.263-.588.588-.588h.568a.588.588 0 01.588.588v.568a.588.588 0 01-.588.588h-.568a.588.588 0 01-.588-.588z"></path></svg>;
    const FootballIcon = () => <svg className="w-16 h-16 text-white" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM12,6.13,9.9,7.43l.77,2.37-2.28.93-1.4-2L5.1,10.25l1.4,2,2.28-.93L8.01,9.25,9.9,10.57,12,9.27l2.1,1.3.77-2.37,2.28.93,1.4-2L18.9,10.25l-1.4,2-2.28-.93.77,2.37-2.1-1.3ZM12,13.87l-2.1-1.3L8.01,15.1l-2.28.93-1.4-2L2.9,15.75l1.4,2,2.28-.93.77-2.37,2.1,1.3,2.1,1.3L15.9,14.57l.77,2.37,2.28.93,1.4-2-1.88-1.5-1.4,2-2.28-.93L14.1,12.57Z"></path></svg>;
    const TennisIcon = () => <svg className="w-16 h-16 text-white" stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 4.5a7.5 7.5 0 10-6.5 9.5l3.5-3.5"></path><path strokeLinecap="round" strokeLinejoin="round" d="M14.5 9.5a7.5 7.5 0 106.5-9.5l-3.5 3.5"></path><circle cx="12" cy="12" r="1.5"></circle></svg>;
    const KabaddiIcon = () => <svg className="w-16 h-16 text-white" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24"><path d="M16,4a1,1,0,0,0-1,1V6.58l-2.29-2.29a1,1,0,0,0-1.42,1.42L13.59,8H10a1,1,0,0,0,0,2h5a1,1,0,0,0,0-2H12.41l3.3-3.29A1,1,0,0,0,16,4ZM8.41,10H5a1,1,0,0,0,0,2h2.59l-2.3,2.29a1,1,0,0,0,1.42,1.42L9,13.41V16a1,1,0,0,0,2,0V11a1,1,0,0,0-1-1H9.41ZM20.5,12A8.5,8.5,0,1,1,12,3.5,8.5,8.5,0,0,1,20.5,12Z"></path></svg>;
    const BadmintonIcon = () => <svg className="w-16 h-16 text-white" stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3.25l10.5 10.5-2.5 2.5-10.5-10.5 2.5-2.5z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 10.25l-4.5 4.5"></path><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 20.75l-3-3"></path><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 17.75l-3-3"></path><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 14.75l-3-3"></path></svg>;
    
    const sports = { Football: <FootballIcon />, Cricket: <CricketIcon />, Tennis: <TennisIcon />, Kabaddi: <KabaddiIcon />, Badminton: <BadmintonIcon /> };

    return (
         <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <FormInput label={t('dob')} name="dob" type="date" value={formData.dob} onChange={handleInputChange} required disabled={isEditing} />
                    <FormSelect label={t('gender')} name="gender" value={formData.gender} onChange={handleInputChange} options={['Male', 'Female', 'Other']} disabled={isEditing} />
                    <FormSlider label={t('height')} name="height" value={formData.height} onChange={handleInputChange} min="120" max="220" unit="cm" disabled={isEditing} />
                    <FormSlider label={t('weight')} name="weight" value={formData.weight} onChange={handleInputChange} min="40" max="150" unit="kg" />
                </div>
                <div className="space-y-6">
                    <FormSelect label={t('bodyType')} name="body_type" value={formData.body_type} onChange={handleInputChange} options={{'Ectomorph': 'Ectomorph', 'Mesomorph': 'Mesomorph', 'Endomorph': 'Endomorph'}} disabled={isEditing} />
                    <FormSelect label={t('dietPreference')} name="diet_preference" value={formData.diet_preference} onChange={handleInputChange} options={['Vegetarian', 'Non-Vegetarian']} disabled={isEditing} />
                </div>
            </div>
            <div className="mt-8">
                <label className="block mb-4 font-medium text-center text-lg">{t('selectSport')}</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.keys(sports).map(sport => (
                        <button type="button" key={sport} onClick={() => !isEditing && handleSportSelect(sport)} className={`group relative rounded-lg cursor-pointer overflow-hidden transition-all duration-300 transform hover:scale-105 ${formData.sport === sport ? 'ring-4 ring-indigo-500' : ''} ${isEditing ? 'cursor-not-allowed opacity-60' : ''}`}>
                            <div className="w-full h-40 object-cover flex items-center justify-center bg-gray-700/50 rounded-lg">{sports[sport]}</div>
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center pb-2">
                                <p className="text-white font-bold text-lg">{sport}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-8 text-center">
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">{t('saveChanges')}</button>
            </div>
        </form>
    );
}

// --- Profile Details View ---
function ProfileDetails({ user, profile }) {
    const { t } = useContext(LanguageContext);
    const age = profile.dob ? new Date().getFullYear() - new Date(profile.dob).getFullYear() : 'N/A';
    return (
        <div className="space-y-4 text-lg">
            <p><strong>{t('username')}:</strong> {user.username}</p>
            <p><strong>{t('age')}:</strong> {age}</p>
            <p><strong>{t('gender')}:</strong> {profile.gender}</p>
            <p><strong>{t('height')}:</strong> {profile.height} cm</p>
            <p><strong>{t('weight')}:</strong> {profile.weight} kg</p>
            <p><strong>{t('bodyType')}:</strong> {profile.body_type}</p>
            <p><strong>{t('diet')}:</strong> {profile.diet_preference}</p>
            <p><strong>Primary Sport:</strong> {profile.sport}</p>
        </div>
    );
}


// --- Fitness Test Page ---
const sportSpecificTests = {
    'Cricket': [
        { name: 'sprint_20m', label: '20m Sprint', unit: 'seconds', placeholder: 'e.g., 3.1' },
        { name: 'yo_yo_test', label: 'Yo-Yo Intermittent Test', unit: 'level', placeholder: 'e.g., 17.2' },
        { name: 'vertical_jump', label: 'Vertical Jump', unit: 'cm', placeholder: 'e.g., 55' },
        { name: 'plank', label: 'Plank Hold', unit: 'seconds', placeholder: 'e.g., 90' },
        { name: 'medicine_ball_throw', label: 'Medicine Ball Throw (3kg)', unit: 'meters', placeholder: 'e.g., 5' },
        { name: 'pushups', label: 'Max Pushups', unit: 'reps', placeholder: 'e.g., 30' },
        { name: 'sit_and_reach', label: 'Sit and Reach', unit: 'cm', placeholder: 'e.g., 15' },
    ],
    'Football': [
        { name: 'sprint_40m', label: '40m Sprint', unit: 'seconds', placeholder: 'e.g., 5.2' },
        { name: 'beep_test', label: 'Multi-Stage Fitness (Beep) Test', unit: 'level', placeholder: 'e.g., 12.5' },
        { name: 'vertical_jump', label: 'Vertical Jump', unit: 'cm', placeholder: 'e.g., 60' },
        { name: 'agility_t_test', label: 'Agility T-Test', unit: 'seconds', placeholder: 'e.g., 10.5' },
        { name: 'broad_jump', label: 'Standing Broad Jump', unit: 'cm', placeholder: 'e.g., 250' },
        { name: 'pullups', label: 'Max Pull-ups', unit: 'reps', placeholder: 'e.g., 10' },
        { name: 'plank', label: 'Plank Hold', unit: 'seconds', placeholder: 'e.g., 120' },
    ],
    'Default': [
        { name: 'run_1_5km', label: '1.5km Run', unit: 'minutes', placeholder: 'e.g., 7.5' },
        { name: 'pushups', label: 'Max Pushups', unit: 'reps', placeholder: 'e.g., 25' },
        { name: 'vertical_jump', label: 'Vertical Jump', unit: 'cm', placeholder: 'e.g., 50' },
        { name: 'plank', label: 'Plank Hold', unit: 'seconds', placeholder: 'e.g., 75' },
        { name: 'sit_and_reach', label: 'Sit and Reach', unit: 'cm', placeholder: 'e.g., 10' },
        { name: 'squats', label: 'Max Bodyweight Squats in 1 min', unit: 'reps', placeholder: 'e.g., 40' },
        { name: 'burpees', label: 'Max Burpees in 1 min', unit: 'reps', placeholder: 'e.g., 15' },
    ]
};

function FitnessTest({ user, profile, onTestComplete, onBack }) {
    const { t } = useContext(LanguageContext);
    const tests = sportSpecificTests[profile.sport] || sportSpecificTests['Default'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const results = Object.fromEntries(new FormData(e.target).entries());
        
        try {
            await fetch('http://127.0.0.1:5000/save_test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, sport: profile.sport, results }),
            });
        } catch (err) {
            console.error("Test save karne mein fail hua:", err);
        }

        const analysisResult = analyzeTestResults(results, profile.sport);
        onTestComplete(results, analysisResult);
    };

    return (
        <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-300">{profile.sport} {t('fitnessTestTitle')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
                {tests.map(test => (
                    <FormInput 
                        key={test.name}
                        label={`${test.label} (${test.unit})`}
                        name={test.name}
                        type="number"
                        step="0.1"
                        placeholder={test.placeholder}
                        required 
                    />
                ))}
                <div className="flex gap-4 pt-4">
                    <button type="button" onClick={onBack} className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition">{t('back')}</button>
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition">{t('analyzeAndPlan')}</button>
                </div>
            </form>
        </div>
    );
}

// --- Analysis Helper Function ---
function analyzeTestResults(results, sport) {
    const benchmarks = {
        'Cricket': { 
            sprint_20m: { levels: [3.2, 2.9], category: 'Speed' },
            yo_yo_test: { levels: [16, 18], category: 'Endurance' },
        },
        'Football': {
            sprint_40m: { levels: [5.5, 5.0], category: 'Speed' },
            beep_test: { levels: [11, 13], category: 'Aerobic Endurance' },
        },
        'Default': {
            run_1_5km: { levels: [8, 6.5], category: 'Cardio' },
            pushups: { levels: [20, 40], category: 'Strength' },
        }
    };
    
    const sportBenchmarks = { ...benchmarks['Default'], ...(benchmarks[sport] || {}) };
    const detailed = {};
    const progressAreas = [];

    for (const test in results) {
        if (!sportBenchmarks[test]) continue;
        const value = parseFloat(results[test]);
        const benchmark = sportBenchmarks[test];
        const isLowerBetter = test.includes('sprint') || test.includes('run');
        let feedback = '';

        if ((!isLowerBetter && value < benchmark.levels[0]) || (isLowerBetter && value > benchmark.levels[0])) {
            feedback = 'Needs Improvement';
            progressAreas.push(benchmark.category);
        } else if ((!isLowerBetter && value >= benchmark.levels[1]) || (isLowerBetter && value <= benchmark.levels[1])) {
            feedback = 'Excellent';
        } else {
            feedback = 'Good';
        }
        detailed[test] = { value, feedback, category: benchmark.category };
    }

    return { 
        progressAreas: progressAreas.length > 0 ? [...new Set(progressAreas)] : [],
        detailed
    };
}


// --- Diet Plan Component ---
function DietPlan({ weight, preference }) {
    const { t } = useContext(LanguageContext);
    const dietPlans = {
        'under-70': {
            'Vegetarian': {
                Breakfast: [{ item: "Oats with milk, nuts & fruit", calories: "350-450" }, { item: "2-3 Besan chillas with curd", calories: "300-400" }],
                Snack1: [{ item: "A handful of roasted chana", calories: "150-200" }, { item: "A fruit (apple/banana)", calories: "100-150" }],
                Lunch: [{ item: "2 Rotis, 1 bowl dal, 1 bowl sabzi, salad", calories: "400-500" }, { item: "1 bowl vegetable pulao with raita", calories: "450-550" }],
                Snack2: [{ item: "A glass of buttermilk (chaas)", calories: "50-80" }, { item: "A small bowl of sprouts salad", calories: "100-150" }],
                Dinner: [{ item: "2 Rotis, 1 bowl paneer sabzi, salad", calories: "400-500" }, { item: "1 bowl khichdi with curd", calories: "350-450" }],
            },
            'Non-Vegetarian': {
                Breakfast: [{ item: "3-4 Egg whites scramble, 2 brown bread", calories: "300-400" }, { item: "Chicken sandwich (100g chicken)", calories: "350-450" }],
                Snack1: [{ item: "A handful of nuts", calories: "150-250" }, { item: "A boiled egg", calories: "80-100" }],
                Lunch: [{ item: "2 Rotis, 1 bowl chicken curry, salad", calories: "450-550" }, { item: "1 bowl fish curry with brown rice", calories: "450-550" }],
                Snack2: [{ item: "A glass of milk", calories: "100-150" }, { item: "Yogurt", calories: "100-120" }],
                Dinner: [{ item: "150g Grilled chicken or fish with veggies", calories: "400-500" }, { item: "2 Rotis with egg bhurji (2 eggs)", calories: "350-450" }],
            }
        },
    };

    const weightCategory = 'under-70'; // Simplified for brevity
    const plan = dietPlans[weightCategory]?.[preference];
    if (!plan) {
        return <p className="text-red-400">{t('dietPlanUnavailable')}</p>;
    }
    const mealOrder = ['Breakfast', 'Snack1', 'Lunch', 'Snack2', 'Dinner'];
    const mealDisplayNames = { 'Breakfast': 'Breakfast', 'Snack1': 'Snack 1 (Mid-Morning)', 'Lunch': 'Lunch', 'Snack2': 'Snack 2 (Evening)', 'Dinner': 'Dinner' };

    return (
        <div className="overflow-x-auto text-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-600">
                        <th className="p-3 font-bold uppercase text-gray-300 text-sm border border-gray-500">Meal</th>
                        <th className="p-3 font-bold uppercase text-gray-300 text-sm border border-gray-500">Option</th>
                        <th className="p-3 font-bold uppercase text-gray-300 text-sm border border-gray-500">Calories (approx.)</th>
                    </tr>
                </thead>
                <tbody>
                    {mealOrder.map(mealKey => {
                        const options = plan[mealKey] || [];
                        return (
                           <React.Fragment key={mealKey}>
                            {options.map((option, index) => (
                                <tr key={`${mealKey}-${index}`} className="hover:bg-gray-700">
                                    {index === 0 && <td className="p-3 font-semibold border border-gray-500" rowSpan={options.length}>{mealDisplayNames[mealKey]}</td>}
                                    <td className="p-3 border border-gray-500">{option.item}</td>
                                    <td className="p-3 border border-gray-500">{option.calories}</td>
                                </tr>
                            ))}
                           </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

// --- Plan Page ---
function PlanPage({ userDetails, analysis, user, onStartOver, existingPlan }) {
    const [plan, setPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { t } = useContext(LanguageContext);
    
    useEffect(() => {
        const generatePlan = async () => {
            if(existingPlan){
                setPlan(existingPlan);
                setIsLoading(false);
                return;
            }
            if (!userDetails || !analysis || !user) return;
            setIsLoading(true);
            setError('');
            try {
                const response = await fetch('http://127.0.0.1:5000/generate_plan', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userDetails, analysis, userId: user.id }),
                });
                const data = await response.json();
                if (response.ok) {
                    setPlan(JSON.parse(data.plan_text).workout_plan);
                } else {
                    setError(data.error || t('planGenFailed'));
                }
            } catch (err) {
                setError(t('aiConnectError'));
            } finally {
                setIsLoading(false);
            }
        };
        generatePlan();
    }, [userDetails, analysis, user, existingPlan, t]);

    const getFeedbackColor = (feedback) => {
        if (feedback === 'Excellent') return 'text-green-400';
        if (feedback === 'Good') return 'text-yellow-400';
        return 'text-red-400';
    };

    if (!userDetails) {
        return <div className="text-center">{t('loading')}</div>;
    }

    return (
        <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-300">{t('planDisplayTitle')}</h2>
            <div className="space-y-8">
                <div>
                     <h3 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">{t('analysis')}</h3>
                     <div className="text-sm space-y-3 bg-gray-900/50 p-4 rounded-lg">
                        {analysis && analysis.detailed && Object.values(analysis.detailed).length > 0 ? Object.values(analysis.detailed).map(item => (
                            <div key={item.category}>
                                <strong>{item.category}: </strong>
                                <span className={getFeedbackColor(item.feedback)}>{t(`detailedFeedback.${item.feedback.toLowerCase().replace(' ', '')}`)}</span>
                                <span className="text-gray-400"> ({item.value})</span>
                            </div>
                        )) : <p>{t('analysisUnavailable')}</p>}
                     </div>
                </div>
                 <div>
                     <h3 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">{t('dietPlan')}</h3>
                     <DietPlan weight={userDetails.weight} preference={userDetails.diet_preference} />
                 </div>
                <div>
                    <h3 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">{t('workoutPlan')}</h3>
                    {isLoading && <p>{t('generatingPlan')}</p>}
                    {error && <p className="text-red-400">{error}</p>}
                    {plan && (
                        <div className="space-y-4 text-sm divide-y divide-gray-700">
                           {Object.entries(plan).map(([day, desc]) => (
                               <WorkoutItem key={day} day={day} desc={desc} sport={userDetails.sport} user={user} />
                           ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="text-center mt-8">
                <button onClick={onStartOver} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition">{t('startOver')}</button>
            </div>
        </div>
    );
}

function WorkoutItem({ day, desc, sport, user }) {
    const [isLogged, setIsLogged] = useState(false);
    const { t } = useContext(LanguageContext);
    
    const dayMap = { 'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 };
    const currentDayIndex = new Date().getDay();
    const workoutDayIndex = dayMap[day];
    const canLog = workoutDayIndex <= currentDayIndex;


    const handleLogWorkout = async () => {
        const workoutData = {
            log_date: new Date().toLocaleDateString('en-CA'),
            sport: sport,
            day_of_week: day,
            workout_details: desc,
            userId: user.id
        };
        try {
            const response = await fetch('http://127.0.0.1:5000/log_workout', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(workoutData),
            });
            if (response.ok) {
                setIsLogged(true);
            } else { alert((await response.json()).error || t('logWorkoutFailed')); }
        } catch (error) {
            alert(t('logConnectError'));
        }
    };
    
    return (
        <div className="flex justify-between items-start py-3">
            <div>
                <h4 className="font-semibold text-blue-300">{day}</h4>
                <p className="text-sm">{desc}</p>
            </div>
            <button 
                onClick={handleLogWorkout}
                disabled={isLogged || !canLog}
                className={`text-xs font-bold py-1 px-2 rounded-md ml-4 flex-shrink-0 transition-all ${isLogged ? 'bg-green-600 cursor-not-allowed' : canLog ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-gray-500 cursor-not-allowed'}`}
            >
                {isLogged ? t('logged') : t('log')}
            </button>
        </div>
    );
}

// --- Progress Page ---
function ProgressPage({ user }) {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useContext(LanguageContext);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/get_progress', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.id })
                });
                const data = await response.json();
                if(response.ok) setLogs(data);
                else setLogs([]);
            } catch (error) {
                console.error("Progress fetch karne mein error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProgress();
    }, [user.id]);
    
    return (
         <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">{t('progressLog')}</h2>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                {isLoading ? <p>{t('loadingProgress')}</p> : 
                 logs.length > 0 ? logs.map(log => (
                    <div key={log.id} className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <p className="font-bold text-white">{log.sport} - {log.day_of_week}</p>
                            <p className="text-xs text-gray-400">{new Date(log.log_date).toLocaleDateString('hi-IN')}</p>
                        </div>
                        <p className="text-sm text-gray-300">{log.workout_details}</p>
                    </div>
                )) : <p>{t('noWorkoutsLogged')}</p>
                }
            </div>
        </div>
    );
}

// --- Health Tools Page ---
function HealthToolsPage({ profile }) {
    return (
        <div className="grid md:grid-cols-2 gap-8">
            <BMICalculator height={profile.height} weight={profile.weight} />
            <CalorieIntakeCalculator profile={profile} />
            <CalorieBurnCalculator />
        </div>
    );
}

function BMICalculator({ height, weight }) {
    const [bmi, setBmi] = useState(null);
    const { t } = useContext(LanguageContext);

    useEffect(() => {
        if (height && weight) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBmi(bmiValue);
        }
    }, [height, weight]);

    const getBmiCategory = (bmi) => {
        if (bmi < 18.5) return { category: t('underweight'), color: "text-blue-400" };
        if (bmi >= 18.5 && bmi <= 24.9) return { category: t('normalWeight'), color: "text-green-400" };
        if (bmi >= 25 && bmi <= 29.9) return { category: t('overweight'), color: "text-yellow-400" };
        return { category: t('obesity'), color: "text-red-400" };
    };
    
    const bmiInfo = bmi ? getBmiCategory(bmi) : null;

    return (
        <div className="bg-gray-800/70 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">{t('bmiCalculator')}</h3>
            {bmi ? (
                <div>
                    <p className="text-4xl font-bold">{bmi}</p>
                    <p className={`text-lg font-semibold ${bmiInfo.color}`}>{bmiInfo.category}</p>
                    <p className="text-xs text-gray-400 mt-2">{t('bmiInfo', {height, weight})}</p>
                </div>
            ) : <p>{t('bmiProfileError')}</p>}
        </div>
    );
}

function CalorieIntakeCalculator({ profile }) {
    const [activityLevel, setActivityLevel] = useState('sedentary');
    const [calories, setCalories] = useState(null);
    const { t } = useContext(LanguageContext);

    useEffect(() => {
        const age = profile.dob ? new Date().getFullYear() - new Date(profile.dob).getFullYear() : null;
        if (age && profile.weight && profile.height && profile.gender) {
            let bmr;
            if (profile.gender === 'Male') {
                bmr = 88.362 + (13.397 * profile.weight) + (4.799 * profile.height) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * profile.weight) + (3.098 * profile.height) - (4.330 * age);
            }
            
            const activityMultipliers = {
                sedentary: 1.2,
                light: 1.375,
                moderate: 1.55,
                active: 1.725,
                veryActive: 1.9,
            };
            setCalories(Math.round(bmr * activityMultipliers[activityLevel]));
        }
    }, [profile, activityLevel]);

    return (
        <div className="bg-gray-800/70 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">{t('calorieIntake')}</h3>
            <FormSelect label={t('activityLevel')} value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} options={{
                sedentary: 'Sedentary (little or no exercise)',
                light: 'Lightly active (exercise 1-3 days/week)',
                moderate: 'Moderately active (exercise 3-5 days/week)',
                active: 'Active (exercise 6-7 days a week)',
                veryActive: 'Very active (hard exercise & physical job)'
            }} />
            {calories ? (
                <div className="mt-4">
                    <p className="text-gray-300">{t('maintenanceCalories')}</p>
                    <p className="text-4xl font-bold text-green-400">{calories} <span className="text-lg">kcal/day</span></p>
                </div>
            ) : <p className="mt-4">{t('profileDataNeeded')}</p>}
        </div>
    );
}

function CalorieBurnCalculator() {
    const [duration, setDuration] = useState(30);
    const [activity, setActivity] = useState('running');
    const [burnedCalories, setBurnedCalories] = useState(null);
    const { t } = useContext(LanguageContext);

    const metValues = { running: 8, cycling: 7.5, swimming: 7, walking: 3.5, weightLifting: 5 };

    useEffect(() => {
        // Assume an average weight of 70kg for calculation
        const calories = Math.round(metValues[activity] * 3.5 * 70 / 200 * duration);
        setBurnedCalories(calories);
    }, [activity, duration]);

    return (
        <div className="bg-gray-800/70 p-6 rounded-2xl shadow-lg md:col-span-2">
            <h3 className="text-xl font-bold mb-4">{t('calorieBurn')}</h3>
            <div className="grid grid-cols-2 gap-4">
                <FormSelect label={t('activity')} value={activity} onChange={(e) => setActivity(e.target.value)} options={{running: 'Running', cycling: 'Cycling', swimming: 'Swimming', walking: 'Walking', weightLifting: 'Weight Lifting'}} />
                <FormInput label={t('duration')} type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>
            {burnedCalories && (
                 <div className="mt-4">
                    <p className="text-gray-300">{t('estimatedBurn')}</p>
                    <p className="text-4xl font-bold text-yellow-400">{burnedCalories} <span className="text-lg">kcal</span></p>
                </div>
            )}
        </div>
    );
}

// --- Chatbot ---
function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const chatEndRef = useRef(null);
    const { t } = useContext(LanguageContext);

    useEffect(() => {
        setMessages([{ sender: 'ai', text: t('chatDefault') }]);
    }, [t]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    const handleChatSubmit = async (e) => {
        e.preventDefault();
        const input = e.target.elements.chatInput;
        const messageText = input.value.trim();
        if(!messageText) return;

        setMessages(prev => [...prev, {sender: 'user', text: messageText}]);
        input.value = '';

        setMessages(prev => [...prev, {sender: 'ai', text: '...'}]);

        try {
            const response = await fetch('http://127.0.0.1:5000/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: messageText }),
            });
            const data = await response.json();
            setMessages(prev => [...prev.slice(0, -1), {sender: 'ai', text: data.response || t('chatError')}]);
        } catch (error) {
            setMessages(prev => [...prev.slice(0, -1), {sender: 'ai', text: t('chatConnectError')}]);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen && (
                <div className="w-80 bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl flex flex-col h-[32rem] origin-bottom-right">
                    <div className="bg-gray-700/80 p-4 rounded-t-2xl"><h3 className="font-bold text-lg text-white">{t('aiAssistant')}</h3></div>
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-3 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-gray-600 rounded-br-none' : 'bg-indigo-600 rounded-bl-none'}`}>
                                    <p className="text-sm">{msg.text === '...' ? <span className="italic">{t('thinking')}</span> : msg.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-700 flex items-center gap-2">
                        <input name="chatInput" type="text" className="flex-1 bg-gray-600 border border-gray-500 text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder={t('typeMessage')}/>
                        <button type="submit" className="bg-indigo-600 text-white rounded-full p-2.5 hover:bg-indigo-700 transition"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></button>
                    </form>
                </div>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition mt-4 ml-auto block">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </button>
        </div>
    );
}

// --- Helper UI Components ---
const FormInput = (props) => (
    <div>
        <label className="block mb-2 font-medium">{props.label}</label>
        <input {...props} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50" />
    </div>
);

const FormSelect = ({ label, name, value, onChange, options, ...props }) => (
    <div>
        <label className="block mb-2 font-medium">{label}</label>
        <select name={name} value={value} onChange={onChange} {...props} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50">
            {Array.isArray(options) ? 
                options.map(opt => <option key={opt} value={opt}>{opt}</option>) :
                Object.entries(options).map(([val, text]) => <option key={val} value={val}>{text}</option>)
            }
        </select>
    </div>
);

const FormSlider = ({ label, name, value, onChange, min, max, unit, ...props }) => (
    <div>
        <label className="block mb-2 font-medium">{label}: <span>{value} {unit}</span></label>
        <input type="range" name={name} value={value} onChange={onChange} min={min} max={max} {...props} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50" />
    </div>
);

