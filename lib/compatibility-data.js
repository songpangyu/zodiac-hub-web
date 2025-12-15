// Compatibility scores (0-100) between zodiac signs
const compatibilityMatrix = {
    Aries: {
        Aries: 75, Taurus: 55, Gemini: 80, Cancer: 50, Leo: 95, Virgo: 55,
        Libra: 70, Scorpio: 60, Sagittarius: 90, Capricorn: 45, Aquarius: 85, Pisces: 50
    },
    Taurus: {
        Aries: 55, Taurus: 85, Gemini: 45, Cancer: 90, Leo: 65, Virgo: 95,
        Libra: 60, Scorpio: 85, Sagittarius: 40, Capricorn: 95, Aquarius: 50, Pisces: 85
    },
    Gemini: {
        Aries: 80, Taurus: 45, Gemini: 70, Cancer: 55, Leo: 90, Virgo: 60,
        Libra: 95, Scorpio: 45, Sagittarius: 75, Capricorn: 40, Aquarius: 95, Pisces: 55
    },
    Cancer: {
        Aries: 50, Taurus: 90, Gemini: 55, Cancer: 80, Leo: 60, Virgo: 85,
        Libra: 45, Scorpio: 95, Sagittarius: 40, Capricorn: 70, Aquarius: 45, Pisces: 95
    },
    Leo: {
        Aries: 95, Taurus: 65, Gemini: 90, Cancer: 60, Leo: 80, Virgo: 55,
        Libra: 85, Scorpio: 60, Sagittarius: 95, Capricorn: 45, Aquarius: 70, Pisces: 55
    },
    Virgo: {
        Aries: 55, Taurus: 95, Gemini: 60, Cancer: 85, Leo: 55, Virgo: 75,
        Libra: 60, Scorpio: 90, Sagittarius: 45, Capricorn: 95, Aquarius: 50, Pisces: 80
    },
    Libra: {
        Aries: 70, Taurus: 60, Gemini: 95, Cancer: 45, Leo: 85, Virgo: 60,
        Libra: 80, Scorpio: 55, Sagittarius: 85, Capricorn: 50, Aquarius: 95, Pisces: 60
    },
    Scorpio: {
        Aries: 60, Taurus: 85, Gemini: 45, Cancer: 95, Leo: 60, Virgo: 90,
        Libra: 55, Scorpio: 80, Sagittarius: 50, Capricorn: 85, Aquarius: 45, Pisces: 95
    },
    Sagittarius: {
        Aries: 90, Taurus: 40, Gemini: 75, Cancer: 40, Leo: 95, Virgo: 45,
        Libra: 85, Scorpio: 50, Sagittarius: 80, Capricorn: 55, Aquarius: 90, Pisces: 55
    },
    Capricorn: {
        Aries: 45, Taurus: 95, Gemini: 40, Cancer: 70, Leo: 45, Virgo: 95,
        Libra: 50, Scorpio: 85, Sagittarius: 55, Capricorn: 80, Aquarius: 55, Pisces: 75
    },
    Aquarius: {
        Aries: 85, Taurus: 50, Gemini: 95, Cancer: 45, Leo: 70, Virgo: 50,
        Libra: 95, Scorpio: 45, Sagittarius: 90, Capricorn: 55, Aquarius: 80, Pisces: 65
    },
    Pisces: {
        Aries: 50, Taurus: 85, Gemini: 55, Cancer: 95, Leo: 55, Virgo: 80,
        Libra: 60, Scorpio: 95, Sagittarius: 55, Capricorn: 75, Aquarius: 65, Pisces: 85
    }
};

const compatibilityDescriptions = {
    excellent: {
        range: [85, 100],
        title: "Excellent Match! ✨",
        description: "You two are destined for each other! This is a cosmic connection that promises passion, understanding, and lasting love. The stars align perfectly for this pairing.",
        advice: "Embrace your natural connection. Focus on growing together while maintaining your individual identities."
    },
    good: {
        range: [70, 84],
        title: "Great Compatibility! 💫",
        description: "A wonderful match with strong potential. You complement each other beautifully and share enough common ground to build something meaningful together.",
        advice: "Nurture your strengths and work on communication to overcome any challenges."
    },
    moderate: {
        range: [55, 69],
        title: "Moderate Compatibility 🌙",
        description: "This relationship can work with effort from both sides. You have differences that can either challenge or complement each other.",
        advice: "Focus on understanding your differences and finding middle ground. Patience is key."
    },
    challenging: {
        range: [40, 54],
        title: "Challenging Match ⭐",
        description: "This pairing requires significant effort. You may have very different approaches to life, but opposites can attract if both are willing to adapt.",
        advice: "Be prepared to compromise and appreciate what makes your partner unique."
    },
    difficult: {
        range: [0, 39],
        title: "Difficult Pairing 💔",
        description: "While not impossible, this match may face many hurdles. Your fundamental differences could lead to friction without conscious effort.",
        advice: "If pursuing this relationship, focus on respect, open communication, and accepting differences."
    }
};


function stringToHash(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        const char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

export function getCompatibilityScore(sign1, sign2) {
    const normalizedSign1 = sign1.charAt(0).toUpperCase() + sign1.slice(1).toLowerCase();
    const normalizedSign2 = sign2.charAt(0).toUpperCase() + sign2.slice(1).toLowerCase();

    if (compatibilityMatrix[normalizedSign1] && compatibilityMatrix[normalizedSign1][normalizedSign2]) {
        return compatibilityMatrix[normalizedSign1][normalizedSign2];
    }
    return 50; 
}

export function getCompatibilityDescription(score) {
    for (const [level, data] of Object.entries(compatibilityDescriptions)) {
        if (score >= data.range[0] && score <= data.range[1]) {
            return { level, ...data };
        }
    }
    return compatibilityDescriptions.moderate;
}

export function getDetailedCompatibility(sign1, sign2) {
    const score = getCompatibilityScore(sign1, sign2);
    const description = getCompatibilityDescription(score);

    return {
        sign1,
        sign2,
        score,
        ...description,
        aspects: generateAspects(sign1, sign2, score)
    };
}


function generateAspects(sign1, sign2, score) {
    
    const seedString = [sign1, sign2].sort().join("");
    const hash = stringToHash(seedString);

    
    const aspectFluctuation = (mod) => (hash % mod) - (mod / 2);

    const aspects = {
        love: Math.min(100, Math.max(0, score + aspectFluctuation(15))),
        trust: Math.min(100, Math.max(0, score + aspectFluctuation(25))),
        communication: Math.min(100, Math.max(0, score + aspectFluctuation(20))),
        values: Math.min(100, Math.max(0, score + aspectFluctuation(10))),
        emotions: Math.min(100, Math.max(0, score + aspectFluctuation(30))),
    };

    return aspects;
}
