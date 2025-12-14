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
        title: "Moderate Compatibility 🌟",
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
        title: "Difficult Pairing 💫",
        description: "While not impossible, this match may face many hurdles. Your fundamental differences could lead to friction without conscious effort.",
        advice: "If pursuing this relationship, focus on respect, open communication, and accepting differences."
    }
};

export function getCompatibilityScore(sign1, sign2) {
    const normalizedSign1 = sign1.charAt(0).toUpperCase() + sign1.slice(1).toLowerCase();
    const normalizedSign2 = sign2.charAt(0).toUpperCase() + sign2.slice(1).toLowerCase();

    if (compatibilityMatrix[normalizedSign1] && compatibilityMatrix[normalizedSign1][normalizedSign2]) {
        return compatibilityMatrix[normalizedSign1][normalizedSign2];
    }
    return 50; // Default score if signs not found
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
    const aspects = {
        love: Math.min(100, Math.max(0, score + Math.floor(Math.random() * 20 - 10))),
        trust: Math.min(100, Math.max(0, score + Math.floor(Math.random() * 20 - 10))),
        communication: Math.min(100, Math.max(0, score + Math.floor(Math.random() * 20 - 10))),
        values: Math.min(100, Math.max(0, score + Math.floor(Math.random() * 20 - 10))),
        emotions: Math.min(100, Math.max(0, score + Math.floor(Math.random() * 20 - 10))),
    };

    return aspects;
}
