const { useState, useEffect, useCallback, useRef } = React;

// ===== FIREBASE REALTIME DATABASE FUNCTIONS =====
const getDatabase = (app) => (app ? app.database() : firebase.database());
const ref = (db, path) => db.ref(path);
const set = (r, val) => r.set(val);
const onValue = (r, callback) => {
    const handler = (snapshot) => callback(snapshot);
    r.on('value', handler);
    return () => r.off('value', handler);
};
const push = (r, val) => {
    if (val !== undefined) return r.push(val);
    return r.push();
};

// ===== ICONS =====
const IconBook     = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>;
const IconPlay     = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const IconSettings = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const IconPlus     = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconBack     = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IconVolume   = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>;
const IconEye      = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconCheck    = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconX        = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconTrash    = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
const IconChart    = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const IconWarning  = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IconCloud    = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>;
const IconEdit     = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconRepeat   = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>;
const IconGoogle   = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>;

// ===== HELPERS =====
const generateId = () => Math.random().toString(36).substr(2, 9);
const playAudio = (text) => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        window.speechSynthesis.speak(u);
    }
};
const playSoundEffect = (type) => {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        if (type === 'correct') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.4, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
            osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.5);
        } else {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(300, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.4, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.3);
        }
    } catch(e) {}
};

// ===== FIREBASE SERVICE =====
const FirebaseService = {
    _initialized: false,
    _db: null,
    _auth: null,

    isConfigured(settings) {
        return !!(settings.fbApiKey && settings.fbProjectId && settings.fbAppId);
    },

    init(settings) {
        if (this._initialized && this._db) return true;
        if (!this.isConfigured(settings)) return false;
        if (typeof firebase === 'undefined') return false;
        try {
            const dbUrl = settings.fbDatabaseUrl?.trim() || `https://${settings.fbProjectId}-default-rtdb.firebaseio.com`;
            const config = {
                apiKey: settings.fbApiKey,
                authDomain: `${settings.fbProjectId}.firebaseapp.com`,
                databaseURL: dbUrl,
                projectId: settings.fbProjectId,
                appId: settings.fbAppId,
            };
            if (!firebase.apps.length) firebase.initializeApp(config);
            this._db = getDatabase();
            this._auth = firebase.auth();
            this._initialized = true;
            return true;
        } catch(e) {
            console.error('Firebase init error:', e);
            return false;
        }
    },

    getDb() {
        return this._db;
    },

    reset() {
        this._initialized = false;
        this._db = null;
        this._auth = null;
    },

    async signInWithGoogle() {
        if (!this._auth) return;
        const provider = new firebase.auth.GoogleAuthProvider();
        await this._auth.signInWithRedirect(provider);
    },

    async checkRedirectResult() {
        if (!this._auth) return null;
        const result = await this._auth.getRedirectResult();
        return result ? result.user : null;
    },

    async signOut() {
        if (this._auth) await this._auth.signOut();
    },

    onAuthStateChanged(callback) {
        if (!this._auth) return () => {};
        return this._auth.onAuthStateChanged(callback);
    }
};

// ===== API SERVICE =====
const ApiService = {
    async enrichWord(word, settings) {
        const result = { term: word, partOfSpeech: '', ipa: '', translation: '', distractors: [], contextSentence: '' };
        if (!settings.geminiApiKey?.trim()) {
            this.applyMock(word, result);
            return result;
        }
        try {
            const rand = Math.random();
            let fmt;
            if (rand < 0.2) fmt = "ALL common Vietnamese translations separated by comma (e.g. đặt hàng, ra lệnh)";
            else if (rand < 0.6) fmt = "ALL common Vietnamese translations - A clear English definition/explanation";
            else fmt = "ALL common Vietnamese translations - Synonyms: 1-2 English synonyms";

            const prompt = `You are an expert English teacher. Analyze the word "${word}".
Return ONLY a valid JSON object:
{
  "isCorrectSpelling": boolean,
  "correctedWord": "string",
  "partOfSpeech": "string",
  "ipa": "string (IPA phonetic)",
  "translation": "string (MUST follow this format: ${fmt})",
  "distractors": ["string","string","string"] (3 wrong answers in the EXACT same format as translation),
  "contextSentence": "string (a natural English sentence using the corrected word)"
}`;
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${settings.geminiApiKey.trim()}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { response_mime_type: 'application/json' }
                })
            });
            if (!res.ok) {
                const errText = await res.text();
                throw new Error(`HTTP ${res.status}: ${errText}`);
            }
            const aiData = await res.json();
            const parsed = JSON.parse(aiData.candidates[0].content.parts[0].text);

            if (parsed.isCorrectSpelling === false && parsed.correctedWord) {
                setTimeout(() => alert(`⚠️ Từ "${word}" có vẻ sai chính tả. Đã sửa thành "${parsed.correctedWord}".`), 100);
            }

            const cleanStr = (val) => {
                if (!val) return '';
                let str = Array.isArray(val) ? val.join(', ') : String(val);
                return str.replace(/[\[\]]/g, '').replace(/^["']|["']$/g, '').trim();
            };

            result.term = parsed.correctedWord || word;
            result.partOfSpeech = parsed.partOfSpeech || '';
            result.ipa = parsed.ipa || '';
            result.translation = cleanStr(parsed.translation);
            result.distractors = (parsed.distractors || []).map(cleanStr);
            result.contextSentence = cleanStr(parsed.contextSentence);
        } catch(e) {
            console.error('Gemini API error:', e);
            alert(`⚠️ Lỗi AI (${e.message}). Đã tạm thời dùng dữ liệu mẫu.`);
            this.applyMock(word, result);
        }
        return result;
    },
    applyMock(word, result) {
        result.translation = `Nghĩa của "${word}"`;
        result.distractors = ['Nghĩa sai A', 'Nghĩa sai B', 'Nghĩa sai C'];
        result.contextSentence = `This is a sample sentence using the word ${word}.`;
    }
};

// ===== ANALYTICS HELPERS =====
const computeStreak = (sessionLogs = []) => {
    if (!sessionLogs || !sessionLogs.length) return 0;
    const days = [...new Set(sessionLogs.map(l => new Date(l.date).toDateString()))].sort((a,b) => new Date(b)-new Date(a));
    let streak = 0;
    let check = new Date(); check.setHours(0,0,0,0);
    for (const day of days) {
        const d = new Date(day); d.setHours(0,0,0,0);
        const diff = Math.round((check - d) / 86400000);
        if (diff === 0 || diff === 1) { streak++; check = d; }
        else break;
    }
    return streak;
};

const computeWeakWords = (sessionLogs = []) => {
    const counts = {};
    (sessionLogs || []).forEach(log => {
        (log.results || []).forEach(r => {
            if (!r.isCorrect) counts[r.word] = (counts[r.word] || 0) + 1;
        });
    });
    return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([word,n])=>({word,count:n}));
};

const computeOverallAccuracy = (sessionLogs = []) => {
    if (!sessionLogs || !sessionLogs.length) return 0;
    const totals = sessionLogs.reduce((acc, l) => ({ score: acc.score + l.score, total: acc.total + l.total }), { score:0, total:0 });
    return totals.total ? Math.round((totals.score / totals.total) * 100) : 0;
};

// ===== QUIZ QUESTION BUILDER =====
const cleanAnswerText = (val) => {
    if (!val) return '';
    let str = Array.isArray(val) ? val.join(', ') : String(val);
    return str.replace(/[\[\]]/g, '').replace(/^["']|["']$/g, '').trim();
};

const buildQuestions = (words) => {
    const colors = ['bg-kahoot-red','bg-kahoot-blue','bg-kahoot-yellow','bg-kahoot-green'];
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    return shuffled.map(word => {
        const rawTrans = cleanAnswerText(word.translation);
        const hasSep = rawTrans.includes(' - ');
        const useVi = !hasSep || Math.random() < 0.5;
        const extract = (val) => {
            let str = cleanAnswerText(val);
            if (!str) return '';
            const idx = str.indexOf(' - ');
            if (idx !== -1) {
                str = useVi ? str.substring(0, idx).trim() : str.substring(idx + 3).trim();
            }
            return cleanAnswerText(str);
        };
        const correct = extract(rawTrans);
        let opts = [correct, ...(word.distractors||[]).slice(0,3).map(d => extract(d))];
        opts = opts.sort(() => Math.random() - 0.5);
        return {
            wordData: word,
            options: opts.map((t,i) => ({ text: t, color: colors[i%4] })),
            correctTranslation: correct
        };
    });
};

// ===== COMPONENTS =====
const Button = ({ children, onClick, className='', variant='primary', icon:Icon, disabled=false, type='button' }) => {
    const variants = {
        primary:      'bg-indigo-600 text-white active:bg-indigo-700',
        secondary:    'bg-gray-200 text-gray-800 active:bg-gray-300',
        danger:       'bg-red-500 text-white active:bg-red-600',
        kahootGreen:  'bg-kahoot-green text-white kahoot-button border-b-4 border-green-900',
        kahootBlue:   'bg-kahoot-blue text-white kahoot-button border-b-4 border-blue-900',
        kahootPurple: 'bg-kahoot-purple text-white kahoot-button border-b-4 border-purple-900',
        ghost:        'text-indigo-600 active:bg-indigo-50',
    };
    return (
        <button type={type} disabled={disabled} onClick={onClick}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all ${variants[variant]||variants.primary} ${className} ${disabled?'opacity-40 cursor-not-allowed':''}`}>
            {Icon && <Icon />}{children}
        </button>
    );
};

const Header = ({ title, leftAction, rightAction }) => (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm sticky top-0 z-20 glass-panel">
        <div className="w-10">{leftAction}</div>
        <h1 className="text-lg font-black text-gray-800 tracking-tight">{title}</h1>
        <div className="flex items-center gap-1">{rightAction}</div>
    </div>
);

const BottomNav = ({ currentView, navigate, openTodayDeck }) => {
    const tabs = [
        { id: 'dashboard', label: 'My Decks', icon: '🎴' },
        { id: '_create', label: 'Học hôm nay', icon: '➕', action: openTodayDeck },
        { id: 'analytics', label: 'Analytics', icon: '📊' },
    ];
    return (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 flex z-30 shadow-[0_-2px_20px_rgba(0,0,0,0.08)]">
            {tabs.map(tab => {
                const isActive = currentView === tab.id;
                const handleClick = tab.action || (() => navigate(tab.id));
                return (
                    <button key={tab.id} onClick={handleClick}
                        className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-400 active:text-indigo-400'}`}>
                        <span className="text-xl leading-tight">{tab.icon}</span>
                        <span className={`text-[10px] font-semibold ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>{tab.label}</span>
                        {isActive && <span className="w-1 h-1 rounded-full bg-indigo-600 mt-0.5"></span>}
                    </button>
                );
            })}
        </div>
    );
};

// ===== DASHBOARD VIEW =====
const DashboardView = ({ decks, navigate, openTodayDeck, createCustomDeck, deleteDeck }) => {
    const today = new Date().toDateString();
    const unplayed = (decks || []).filter(d => {
        const createdToday = new Date(d.dateCreated).toDateString() === today;
        const playedToday = d.lastPlayedDate && new Date(d.lastPlayedDate).toDateString() === today;
        return createdToday && !playedToday && d.words && d.words.length > 0;
    });

    return (
        <div className="pb-24 min-h-screen bg-gray-50">
            <Header
                title="VocabMaster"
                rightAction={
                    <>
                        <button onClick={() => navigate('analytics')} className="p-2 text-gray-500 hover:text-indigo-600 rounded-full transition-colors"><IconChart /></button>
                        <button onClick={() => navigate('settings')} className="p-2 text-gray-500 hover:text-indigo-600 rounded-full transition-colors"><IconSettings /></button>
                    </>
                }
            />
            {unplayed.length > 0 && (
                <div className="mx-4 mt-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-3 flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5 flex-shrink-0"><IconWarning /></span>
                    <div>
                        <p className="text-sm font-bold text-orange-700">Nhắc nhở ôn tập!</p>
                        <p className="text-xs text-orange-600">Bạn có {unplayed.length} thẻ tạo hôm nay chưa ôn tập. Hãy chơi ngay!</p>
                    </div>
                </div>
            )}
            <div className="p-4 space-y-4">
                <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-xl">
                    <div className="flex items-center gap-2 mb-1"><span className="text-2xl">🎓</span><h2 className="text-2xl font-black">Xin chào!</h2></div>
                    <p className="opacity-90 text-sm mb-5">Bạn có <strong>{(decks || []).length}</strong> thẻ • <strong>{(decks || []).reduce((a,d)=>a+(d.words?d.words.length:0),0)}</strong> từ vựng</p>
                    <div className="flex gap-2">
                        <button onClick={openTodayDeck} className="flex-1 flex items-center justify-center gap-1.5 bg-white/20 backdrop-blur rounded-xl py-3 font-bold text-sm hover:bg-white/30 transition-colors">
                            <span>📅</span> Hôm nay
                        </button>
                        <button onClick={createCustomDeck} className="flex-1 flex items-center justify-center gap-1.5 bg-white/20 backdrop-blur rounded-xl py-3 font-bold text-sm hover:bg-white/30 transition-colors">
                            <span>✏️</span> Thẻ mới
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-700 text-base">Tất cả thẻ</h3>
                    <span className="text-xs text-gray-400">{(decks || []).length} thẻ</span>
                </div>

                {(!decks || decks.length === 0) ? (
                    <div className="text-center py-16 text-gray-400 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <div className="text-5xl mb-3">📚</div>
                        <p className="font-semibold">Chưa có thẻ nào</p>
                        <p className="text-sm mt-1">Bấm "Hôm nay" để bắt đầu học!</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {decks.map(deck => {
                            const wordCount = deck.words ? deck.words.length : 0;
                            const isPlayedToday = deck.lastPlayedDate && new Date(deck.lastPlayedDate).toDateString() === today;
                            return (
                                <div key={deck.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
                                    <div className="p-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xl">🎴</span>
                                        </div>
                                        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigate('editor', { deckId: deck.id })}>
                                            <h4 className="font-bold text-gray-800 truncate">{deck.title}</h4>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-xs text-gray-500">{wordCount} từ</span>
                                                <span className="text-gray-300">•</span>
                                                <span className="text-xs text-gray-500">{new Date(deck.dateCreated).toLocaleDateString('vi-VN')}</span>
                                                {isPlayedToday && <span className="text-xs text-green-600 font-medium">✓ Đã ôn</span>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <button onClick={() => deleteDeck(deck.id)} className="p-2 text-gray-300 hover:text-red-400 rounded-full transition-colors"><IconTrash /></button>
                                            <button onClick={() => navigate('quiz', { deckId: deck.id })} disabled={wordCount === 0}
                                                className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${wordCount > 0 ? 'bg-kahoot-green text-white hover:bg-green-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
                                                {wordCount > 0 ? '▶ Play' : 'Thêm từ'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

// ===== DECK EDITOR VIEW =====
const DeckEditorView = ({ deckId, decks, updateDeck, navigate, settings }) => {
    const deck = (decks || []).find(d => d.id === deckId);
    const [newWord, setNewWord] = useState('');
    const [loading, setLoading] = useState(false);
    const [noKey, setNoKey] = useState(false);
    const inputRef = useRef(null);

    if (!deck) return <div className="p-8 text-center text-gray-500">Không tìm thấy thẻ.</div>;
    const words = deck.words || [];

    const handleAdd = async (e) => {
        e.preventDefault();
        const trimmed = newWord.trim();
        if (!trimmed) return;
        if (!settings.geminiApiKey?.trim()) { setNoKey(true); return; }
        setLoading(true);
        setNoKey(false);
        const data = await ApiService.enrichWord(trimmed, settings);
        updateDeck(deckId, { words: [{ id: generateId(), ...data }, ...words] });
        setNewWord('');
        setLoading(false);
        inputRef.current?.focus();
    };

    const handleDelete = (wordId) => {
        if (confirm('Xóa từ này?')) updateDeck(deckId, { words: words.filter(w => w.id !== wordId) });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <Header
                title="Chỉnh sửa thẻ"
                leftAction={<button onClick={() => navigate('dashboard')} className="p-1 text-gray-600"><IconBack /></button>}
                rightAction={words.length > 0 &&
                    <button onClick={() => navigate('quiz', { deckId })} className="flex items-center gap-1.5 bg-kahoot-green text-white px-3 py-1.5 rounded-lg font-bold text-sm">
                        <IconPlay /> Play
                    </button>
                }
            />
            <div className="p-4 space-y-4">
                {/* Deck title */}
                <div className="bg-white rounded-2xl p-4 border-2 border-dashed border-indigo-300 flex items-center gap-3">
                    <span className="text-indigo-400 flex-shrink-0"><IconEdit /></span>
                    <input type="text" value={deck.title} onChange={e => updateDeck(deckId, { title: e.target.value })}
                        className="font-black text-lg bg-transparent border-none outline-none w-full text-gray-800 placeholder-gray-300"
                        placeholder="Nhập tên thẻ..." />
                </div>
                <p className="text-sm text-gray-500 -mt-2 ml-1">{words.length} từ trong thẻ</p>

                {/* API Key warning */}
                {noKey && (
                    <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 flex items-start gap-2">
                        <span className="text-amber-500 flex-shrink-0 mt-0.5"><IconWarning /></span>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-amber-700">Chưa có Gemini API Key</p>
                            <p className="text-xs text-amber-600">Mỗi thiết bị cần nhập riêng. Vào Settings để cấu hình.</p>
                        </div>
                        <button onClick={() => { setNoKey(false); navigate('settings'); }} className="text-xs font-bold text-amber-700 underline flex-shrink-0">Settings</button>
                    </div>
                )}

                {/* Add word form */}
                <form onSubmit={handleAdd} className="flex gap-2">
                    <input ref={inputRef} type="text" value={newWord} onChange={e => setNewWord(e.target.value)}
                        placeholder="Nhập từ tiếng Anh..." disabled={loading}
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium" />
                    <button type="submit" disabled={loading || !newWord.trim()}
                        className={`px-5 rounded-xl font-bold text-white transition-all ${loading||!newWord.trim() ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'}`}>
                        {loading ? <span className="animate-spin inline-block">⟳</span> : <IconPlus />}
                    </button>
                </form>
                {loading && (
                    <div className="text-center py-3 text-indigo-600 font-medium text-sm animate-pulse">
                        🤖 AI đang tra nghĩa "{newWord}"...
                    </div>
                )}

                {/* Word list */}
                <div className="space-y-3">
                    {words.map(word => (
                        <div key={word.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-slide-up">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="text-xl font-black text-gray-900">{word.term}</h4>
                                    {word.partOfSpeech && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">{word.partOfSpeech}</span>}
                                    {word.ipa && <button onClick={() => playAudio(word.term)} className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition-colors">{word.ipa}</button>}
                                </div>
                                <button onClick={() => handleDelete(word.id)} className="text-gray-300 hover:text-red-400 p-1 transition-colors flex-shrink-0"><IconTrash /></button>
                            </div>
                            <p className="text-indigo-700 font-semibold text-sm mb-2">{word.translation}</p>
                            {word.contextSentence && (
                                <p className="text-xs text-gray-500 italic bg-gray-50 p-2 rounded-lg border-l-2 border-indigo-300">"{word.contextSentence}"</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ===== QUIZ VIEW =====
const QuizView = ({ deckId, decks, navigate, updateDeck, onQuizComplete }) => {
    const deck = (decks || []).find(d => d.id === deckId);
    const [quizKey, setQuizKey] = useState(0);
    const [retryWords, setRetryWords] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [score, setScore] = useState(0);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const words = retryWords || deck?.words || [];
        if (words.length > 0) {
            setQuestions(buildQuestions(words));
            setCurrentIndex(0);
            setScore(0);
            setResults([]);
            setSelectedAnswer(null);
            setShowHint(false);
        }
    }, [quizKey, deckId]);

    const isFinished = questions.length > 0 && currentIndex >= questions.length;

    useEffect(() => {
        if (isFinished) {
            if (updateDeck) updateDeck(deckId, { lastPlayedDate: Date.now() });
            if (onQuizComplete) onQuizComplete({
                deckId,
                deckTitle: deck?.title || '',
                score,
                total: questions.length,
                results
            });
        }
    }, [isFinished]);

    const resetAndPlay = (words = null) => {
        setRetryWords(words);
        setQuizKey(k => k + 1);
    };

    if (!deck) return <div className="p-8 text-center text-gray-500">Không tìm thấy thẻ.</div>;
    if (questions.length === 0) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="text-4xl mb-3 animate-bounce">🎮</div>
                <p className="text-gray-500">Đang tải câu hỏi...</p>
            </div>
        </div>
    );

    if (isFinished) {
        const accuracy = Math.round((score / questions.length) * 100);
        const incorrectResults = results.filter(r => !r.isCorrect);
        const emoji = accuracy >= 80 ? '🏆' : accuracy >= 60 ? '💪' : '📚';
        return (
            <div className="min-h-screen bg-kahoot-purple p-4 flex flex-col justify-center items-center animate-pop-in">
                <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
                    <div className="text-center mb-6">
                        <div className="text-5xl mb-2">{emoji}</div>
                        <h2 className="text-2xl font-black text-gray-800">Hoàn thành!</h2>
                        <div className="flex items-center justify-center gap-4 mt-3">
                            <div className="text-center">
                                <div className="text-4xl font-black text-kahoot-purple">{score}/{questions.length}</div>
                                <div className="text-xs text-gray-500">Điểm số</div>
                            </div>
                            <div className="w-px h-12 bg-gray-200"></div>
                            <div className="text-center">
                                <div className={`text-4xl font-black ${accuracy>=80?'text-kahoot-green':accuracy>=60?'text-kahoot-yellow':'text-kahoot-red'}`}>{accuracy}%</div>
                                <div className="text-xs text-gray-500">Chính xác</div>
                            </div>
                        </div>
                    </div>

                    <div className="max-h-48 overflow-y-auto space-y-2 mb-5">
                        {results.map((r, i) => (
                            <div key={i} className={`p-2.5 rounded-xl border-l-4 ${r.isCorrect ? 'border-kahoot-green bg-green-50' : 'border-kahoot-red bg-red-50'}`}>
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-sm text-gray-800">{r.word}</span>
                                    {r.isCorrect ? <span className="text-green-600"><IconCheck /></span> : <span className="text-red-500"><IconX /></span>}
                                </div>
                                {!r.isCorrect && (
                                    <div className="text-xs mt-1 flex gap-2">
                                        <span className="text-red-400 line-through">{r.selected}</span>
                                        <span className="text-green-600 font-medium">{r.correct}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        {incorrectResults.length > 0 && (
                            <button onClick={() => resetAndPlay(incorrectResults.map(r => r.wordData))}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors">
                                <IconRepeat /> Làm lại {incorrectResults.length} câu sai
                            </button>
                        )}
                        <button onClick={() => resetAndPlay(null)}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-kahoot-blue text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                            <IconRepeat /> Chơi lại từ đầu
                        </button>
                        <button onClick={() => navigate('dashboard')}
                            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                            ← Về trang chủ
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentIndex];
    const handleAnswer = (optText) => {
        if (selectedAnswer) return;
        setSelectedAnswer(optText);
        const isCorrect = optText === currentQ.correctTranslation;
        playSoundEffect(isCorrect ? 'correct' : 'incorrect');
        if (isCorrect) setScore(s => s + 1);
        setResults(prev => [...prev, {
            word: currentQ.wordData.term,
            wordData: currentQ.wordData,
            isCorrect,
            selected: optText,
            correct: currentQ.correctTranslation
        }]);
        setTimeout(() => {
            setSelectedAnswer(null);
            setShowHint(false);
            setCurrentIndex(i => i + 1);
        }, 1400);
    };

    const progress = ((currentIndex) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="bg-white shadow-sm z-10 flex-shrink-0">
                <div className="flex items-center justify-between px-4 h-14">
                    <button onClick={() => navigate('dashboard')} className="text-gray-400 p-1"><IconX /></button>
                    <div className="font-bold text-gray-600 text-sm">
                        {retryWords ? '🔄 Làm lại câu sai ' : ''}<span className="text-gray-900">{currentIndex+1}</span>/{questions.length}
                    </div>
                    <div className="w-8"></div>
                </div>
                <div className="h-1.5 bg-gray-100">
                    <div className="h-full bg-indigo-500 transition-all duration-500" style={{width:`${progress}%`}}></div>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-4 animate-pop-in" key={`q-${currentIndex}-${quizKey}`}>
                <div className="bg-white rounded-3xl p-6 shadow-lg w-full max-w-md mb-4">
                    <div className="text-center">
                        <h2 className="text-5xl font-black text-gray-900 tracking-tight mb-3">{currentQ.wordData.term}</h2>
                        <div className="flex items-center justify-center gap-3">
                            {currentQ.wordData.ipa && (
                                <span className="text-sm font-mono text-blue-700 bg-blue-50 px-3 py-1 rounded-lg">{currentQ.wordData.ipa}</span>
                            )}
                            <button onClick={() => playAudio(currentQ.wordData.term)} className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-blue-600 transition-colors">
                                <IconVolume />
                            </button>
                        </div>
                        {currentQ.wordData.partOfSpeech && <p className="text-xs text-gray-400 mt-2">{currentQ.wordData.partOfSpeech}</p>}
                    </div>
                    <div className="mt-4 text-center">
                        {showHint ? (
                            <p className="text-sm text-gray-600 italic animate-fade-in bg-indigo-50 px-3 py-2 rounded-xl">
                                "{currentQ.wordData.contextSentence}"
                            </p>
                        ) : (
                            <button onClick={() => setShowHint(true)} className="text-indigo-500 text-sm font-semibold flex items-center gap-1.5 mx-auto hover:text-indigo-700 transition-colors">
                                <IconEye /> Xem gợi ý câu
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-4 pb-8 bg-white grid grid-cols-2 gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.06)] flex-shrink-0">
                {currentQ.options.map((opt, i) => {
                    let cls = opt.color;
                    const isSel = selectedAnswer === opt.text;
                    const isCorrectOpt = opt.text === currentQ.correctTranslation;
                    if (selectedAnswer) {
                        if (isCorrectOpt) cls = 'bg-kahoot-green scale-105';
                        else if (isSel) cls = 'bg-kahoot-red';
                        else cls = 'bg-gray-200 opacity-40';
                    }
                    return (
                        <button key={i} disabled={!!selectedAnswer} onClick={() => handleAnswer(opt.text)}
                            className={`${cls} text-white font-bold text-base py-5 px-3 rounded-2xl shadow-[0_4px_0_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none transition-all relative overflow-hidden text-center leading-tight`}
                            style={{ minHeight: '90px' }}>
                            <span className="relative z-10 break-words block">{opt.text}</span>
                            <div className="absolute top-0 right-0 w-12 h-12 bg-black/10 rounded-bl-full pointer-events-none"></div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

// ===== ANALYTICS VIEW =====
const AnalyticsView = ({ decks, sessionLogs, navigate }) => {
    const streak = computeStreak(sessionLogs);
    const weakWords = computeWeakWords(sessionLogs);
    const accuracy = computeOverallAccuracy(sessionLogs);
    const totalWords = (decks || []).reduce((a, d) => a + (d.words ? d.words.length : 0), 0);
    const recentSessions = [...(sessionLogs || [])].sort((a,b)=>b.date-a.date).slice(0,10);

    const StatCard = ({ label, value, sub, color, icon }) => (
        <div className={`rounded-2xl p-4 text-white ${color} shadow-md`}>
            <div className="text-2xl mb-1">{icon}</div>
            <div className="text-3xl font-black">{value}</div>
            <div className="text-sm font-semibold opacity-90">{label}</div>
            {sub && <div className="text-xs opacity-75 mt-0.5">{sub}</div>}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <Header
                title="Thống kê"
                leftAction={<button onClick={() => navigate('dashboard')} className="p-1 text-gray-600"><IconBack /></button>}
            />
            <div className="p-4 space-y-5">
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-3xl p-5 text-white shadow-xl text-center">
                    <div className="streak-fire">🔥</div>
                    <div className="text-5xl font-black mt-1">{streak}</div>
                    <div className="text-lg font-bold opacity-90">Ngày học liên tiếp</div>
                    <div className="text-sm opacity-75 mt-1">{streak === 0 ? 'Học ngay để bắt đầu streak!' : streak >= 7 ? 'Tuyệt vời! Giữ vững nhé!' : 'Cố lên, đừng để streak bị đứt!'}</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <StatCard label="Thẻ đã tạo" value={(decks || []).length} icon="🎴" color="bg-indigo-500" />
                    <StatCard label="Từ đã học" value={totalWords} icon="📝" color="bg-purple-500" />
                    <StatCard label="Độ chính xác" value={`${accuracy}%`} icon="🎯" color={accuracy>=80?'bg-kahoot-green':accuracy>=60?'bg-kahoot-yellow':'bg-kahoot-red'} sub="Trung bình tất cả session" />
                    <StatCard label="Phiên học" value={(sessionLogs || []).length} icon="🏃" color="bg-cyan-500" />
                </div>

                {weakWords.length > 0 && (
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <span>⚠️</span> Từ hay sai nhất
                        </h3>
                        <div className="space-y-2">
                            {weakWords.map((w, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-600 flex-shrink-0">{i+1}</div>
                                    <span className="font-semibold text-gray-700 flex-1">{w.word}</span>
                                    <div className="flex items-center gap-1">
                                        {Array.from({length: Math.min(w.count, 5)}).map((_, j) => (
                                            <div key={j} className="w-1.5 h-4 bg-red-400 rounded-full"></div>
                                        ))}
                                        <span className="text-xs text-red-500 font-bold ml-1">×{w.count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {recentSessions.length > 0 ? (
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-3">📅 Lịch sử học gần đây</h3>
                        <div className="space-y-3">
                            {recentSessions.map((s, i) => {
                                const acc = s.total ? Math.round((s.score/s.total)*100) : 0;
                                return (
                                    <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm flex-shrink-0 ${acc>=80?'bg-kahoot-green':acc>=60?'bg-kahoot-yellow':'bg-kahoot-red'}`}>
                                            {acc}%
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-800 text-sm truncate">{s.deckTitle}</p>
                                            <p className="text-xs text-gray-400">{new Date(s.date).toLocaleString('vi-VN')} • {s.score}/{s.total} đúng</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                        <div className="text-4xl mb-2">📊</div>
                        <p className="font-semibold">Chưa có dữ liệu thống kê</p>
                        <p className="text-sm mt-1">Hãy chơi game để xem kết quả ở đây!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// ===== SETTINGS VIEW =====
const SettingsView = ({ settings, updateSettings, navigate, user, onGoogleLogin, onSignOut }) => {
    const [fbKey, setFbKey] = useState(settings.fbApiKey || '');
    const [fbProject, setFbProject] = useState(settings.fbProjectId || '');
    const [fbAppId, setFbAppId] = useState(settings.fbAppId || '');
    const [fbDbUrl, setFbDbUrl] = useState(settings.fbDatabaseUrl || '');
    const [showFbGuide, setShowFbGuide] = useState(false);

    const saveFbConfig = () => {
        updateSettings({
            fbApiKey: fbKey.trim(),
            fbProjectId: fbProject.trim(),
            fbAppId: fbAppId.trim(),
            fbDatabaseUrl: fbDbUrl.trim()
        });
        alert('Đã lưu cấu hình Firebase Realtime Database. Hãy đăng nhập lại nếu cần.');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <Header title="Cài đặt" leftAction={<button onClick={() => navigate('dashboard')} className="p-1 text-gray-600"><IconBack /></button>} />
            <div className="p-4 space-y-4">

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">🤖 Gemini AI</h3>
                    <p className="text-xs text-gray-500 mb-3">Mỗi thiết bị cần nhập riêng. Lấy key miễn phí tại <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-indigo-600 underline">aistudio.google.com</a></p>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Gemini API Key</label>
                    <input type="password" value={settings.geminiApiKey || ''} onChange={e => updateSettings({ geminiApiKey: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-indigo-400 outline-none text-sm transition-all"
                        placeholder="AIzaSy..." />
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2"><IconCloud /> Realtime Cloud Sync (Firebase)</h3>
                        <button onClick={() => setShowFbGuide(g => !g)} className="text-xs text-indigo-600 font-semibold underline">Hướng dẫn</button>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Đồng bộ dữ liệu PC ↔ Điện thoại trực tiếp qua Firebase Realtime Database.</p>

                    {showFbGuide && (
                        <div className="mb-4 bg-indigo-50 rounded-xl p-3 text-xs text-indigo-800 space-y-1">
                            <p className="font-bold">📋 Hướng dẫn tạo Firebase Realtime Database:</p>
                            <p>1. Vào <strong>console.firebase.google.com</strong> → Tạo/chọn project</p>
                            <p>2. Vào <strong>Build → Realtime Database</strong> → Create Database</p>
                            <p>3. Trong mục <strong>Rules</strong>, đặt cấu hình cho phép người dùng đăng nhập:</p>
                            <pre className="bg-white p-2 rounded text-[10px] my-1 font-mono text-gray-700">
{`{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}`}
                            </pre>
                            <p>4. Copy URL Realtime Database (ví dụ: https://...-default-rtdb.firebaseio.com) vào ô bên dưới.</p>
                        </div>
                    )}

                    <div className="space-y-2 mb-3">
                        <input type="text" value={fbKey} onChange={e => setFbKey(e.target.value)} placeholder="apiKey (AIzaSy...)"
                            className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-400 outline-none text-xs transition-all" />
                        <input type="text" value={fbProject} onChange={e => setFbProject(e.target.value)} placeholder="projectId (my-vocab-app)"
                            className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-400 outline-none text-xs transition-all" />
                        <input type="text" value={fbAppId} onChange={e => setFbAppId(e.target.value)} placeholder="appId (1:123:web:abc)"
                            className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-400 outline-none text-xs transition-all" />
                        <input type="text" value={fbDbUrl} onChange={e => setFbDbUrl(e.target.value)} placeholder="databaseURL (Tùy chọn: https://...-rtdb.firebaseio.com)"
                            className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-400 outline-none text-xs transition-all" />
                    </div>
                    <button onClick={saveFbConfig} className="w-full py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors mb-3">
                        💾 Lưu cấu hình Firebase
                    </button>

                    {user ? (
                        <div className="flex items-center justify-between bg-green-50 rounded-xl p-3">
                            <div>
                                <p className="text-sm font-bold text-green-700">✅ Đã đăng nhập Realtime Sync</p>
                                <p className="text-xs text-green-600">{user.email}</p>
                            </div>
                            <button onClick={onSignOut} className="text-xs text-red-500 font-bold underline">Đăng xuất</button>
                        </div>
                    ) : (
                        <button onClick={onGoogleLogin}
                            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                            <IconGoogle /> Đăng nhập bằng Google
                        </button>
                    )}
                </div>

                <div className="text-center text-xs text-gray-400 pt-2">
                    <p>VocabMaster v2.1 • Firebase Realtime Database Active</p>
                    <p className="mt-1">Khi chưa đăng nhập → dữ liệu lưu tạm ở LocalStorage</p>
                </div>
            </div>
        </div>
    );
};

// ===== MAIN APP =====
const App = () => {
    const [currentView, setCurrentView] = useState('dashboard');
    const [navParams, setNavParams] = useState({});
    const [decks, setDecks] = useState([]);
    const [sessionLogs, setSessionLogs] = useState([]);
    const [settings, setSettings] = useState({ geminiApiKey: '', fbApiKey: '', fbProjectId: '', fbAppId: '', fbDatabaseUrl: '' });
    const [user, setUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load initial settings & local fallback
    useEffect(() => {
        try {
            const s = localStorage.getItem('vocab_settings');
            if (s) setSettings(JSON.parse(s));
            const d = localStorage.getItem('vocab_decks');
            if (d) setDecks(JSON.parse(d));
            const l = localStorage.getItem('vocab_sessions');
            if (l) setSessionLogs(JSON.parse(l));
        } catch(e) { console.error('Load storage error', e); }
        setIsLoaded(true);
    }, []);

    // Save settings
    useEffect(() => {
        if (isLoaded) localStorage.setItem('vocab_settings', JSON.stringify(settings));
    }, [settings, isLoaded]);

    // Save local fallback when NOT logged in
    useEffect(() => {
        if (isLoaded && !user) {
            localStorage.setItem('vocab_decks', JSON.stringify(decks));
        }
    }, [decks, isLoaded, user]);

    useEffect(() => {
        if (isLoaded && !user) {
            localStorage.setItem('vocab_sessions', JSON.stringify(sessionLogs.slice(0, 100)));
        }
    }, [sessionLogs, isLoaded, user]);

    // Firebase Auth & Realtime Database sync
    useEffect(() => {
        if (!isLoaded) return;
        const ok = FirebaseService.init(settings);
        if (!ok) return;

        FirebaseService.checkRedirectResult().then(u => {
            if (u) setUser(u);
        }).catch(e => {
            console.error('Redirect auth error:', e);
        });

        const unsubAuth = FirebaseService.onAuthStateChanged((u) => {
            setUser(u);
        });

        return () => {
            if (typeof unsubAuth === 'function') unsubAuth();
        };
    }, [isLoaded, settings.fbApiKey, settings.fbProjectId, settings.fbAppId, settings.fbDatabaseUrl]);

    // Listen to Firebase Realtime Database at path users/${user.uid}/vocabData
    useEffect(() => {
        if (!isLoaded || !user) return;
        const ok = FirebaseService.init(settings);
        if (!ok) return;

        const db = FirebaseService.getDb();
        if (!db) return;

        const userVocabRef = ref(db, `users/${user.uid}/vocabData`);
        const unsubRealtime = onValue(userVocabRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                if (data) {
                    if (data.decks) setDecks(data.decks);
                    else setDecks([]);
                    if (data.sessionLogs) setSessionLogs(data.sessionLogs);
                    else setSessionLogs([]);
                }
            } else {
                // If remote is empty, initialize remote with local data
                const initialPayload = {
                    decks: decks,
                    sessionLogs: sessionLogs,
                    updatedAt: Date.now()
                };
                set(userVocabRef, initialPayload);
            }
        });

        return () => {
            if (typeof unsubRealtime === 'function') unsubRealtime();
        };
    }, [user, isLoaded, settings.fbApiKey, settings.fbProjectId, settings.fbAppId, settings.fbDatabaseUrl]);

    // Save helper to push updates directly to Realtime Database or LocalStorage
    const saveDecksData = (newDecks, newLogs = sessionLogs) => {
        setDecks(newDecks);
        if (user) {
            const db = FirebaseService.getDb();
            if (db) {
                const userVocabRef = ref(db, `users/${user.uid}/vocabData`);
                set(userVocabRef, {
                    decks: newDecks,
                    sessionLogs: newLogs,
                    updatedAt: Date.now()
                });
            }
        }
    };

    const saveLogsData = (newLogs, currentDecks = decks) => {
        setSessionLogs(newLogs);
        if (user) {
            const db = FirebaseService.getDb();
            if (db) {
                const userVocabRef = ref(db, `users/${user.uid}/vocabData`);
                set(userVocabRef, {
                    decks: currentDecks,
                    sessionLogs: newLogs,
                    updatedAt: Date.now()
                });
            }
        }
    };

    // Navigation
    const navigate = (view, params = {}) => {
        setNavParams(params);
        setCurrentView(view);
        window.scrollTo(0, 0);
    };

    // Deck actions
    const openTodayDeck = () => {
        const dateStr = new Date().toLocaleDateString('vi-VN');
        const existing = decks.find(d => {
            const ds = new Date(d.dateCreated).toLocaleDateString('vi-VN');
            return ds === dateStr || d.title === `Deck ${dateStr}`;
        });
        if (existing) { navigate('editor', { deckId: existing.id }); return; }
        const newDeck = { id: generateId(), title: `Deck ${dateStr}`, dateCreated: Date.now(), words: [] };
        const newDecks = [newDeck, ...decks];
        saveDecksData(newDecks);
        navigate('editor', { deckId: newDeck.id });
    };

    const createCustomDeck = () => {
        const newDeck = { id: generateId(), title: 'New Custom Deck', dateCreated: Date.now(), words: [] };
        const newDecks = [newDeck, ...decks];
        saveDecksData(newDecks);
        navigate('editor', { deckId: newDeck.id });
    };

    const updateDeck = (deckId, updates) => {
        const newDecks = decks.map(d => d.id === deckId ? { ...d, ...updates } : d);
        saveDecksData(newDecks);
    };

    const deleteDeck = (deckId) => {
        if (confirm('Bạn có chắc muốn xóa thẻ này không?')) {
            const newDecks = decks.filter(d => d.id !== deckId);
            saveDecksData(newDecks);
        }
    };

    const updateSettings = (updates) => setSettings(prev => ({ ...prev, ...updates }));

    // Quiz completion
    const handleQuizComplete = (data) => {
        const newLogs = [{ id: generateId(), date: Date.now(), ...data }, ...sessionLogs].slice(0, 100);
        saveLogsData(newLogs);
    };

    // Firebase Auth
    const handleGoogleLogin = async () => {
        const ok = FirebaseService.init(settings);
        if (!ok) { alert('Hãy nhập đầy đủ Firebase config trong Settings trước.'); return; }
        try {
            await FirebaseService.signInWithGoogle();
        } catch(e) { alert('Đăng nhập thất bại: ' + e.message); }
    };

    const handleSignOut = async () => {
        await FirebaseService.signOut();
        setUser(null);
    };

    if (!isLoaded) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center"><div className="text-4xl mb-3 animate-bounce">📚</div><p className="text-gray-500">Đang tải...</p></div>
        </div>
    );

    const showBottomNav = !['quiz'].includes(currentView);

    return (
        <div className="mx-auto max-w-md w-full min-h-screen bg-gray-100 shadow-2xl overflow-hidden relative">
            {currentView === 'dashboard' && <DashboardView decks={decks} navigate={navigate} openTodayDeck={openTodayDeck} createCustomDeck={createCustomDeck} deleteDeck={deleteDeck} />}
            {currentView === 'editor'    && <DeckEditorView deckId={navParams.deckId} decks={decks} updateDeck={updateDeck} navigate={navigate} settings={settings} />}
            {currentView === 'quiz'      && <QuizView deckId={navParams.deckId} decks={decks} navigate={navigate} updateDeck={updateDeck} onQuizComplete={handleQuizComplete} />}
            {currentView === 'analytics' && <AnalyticsView decks={decks} sessionLogs={sessionLogs} navigate={navigate} />}
            {currentView === 'settings'  && <SettingsView settings={settings} updateSettings={updateSettings} navigate={navigate} user={user} onGoogleLogin={handleGoogleLogin} onSignOut={handleSignOut} />}
            {showBottomNav && <BottomNav currentView={currentView} navigate={navigate} openTodayDeck={openTodayDeck} />}
        </div>
    );
};

// ===== RENDER =====
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
