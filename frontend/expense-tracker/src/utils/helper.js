import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


export const getInitials = (name) => {
    if (!name) return "";

    const words = name.trim().split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        if (words[i] && words[i].length > 0) {
            initials += words[i][0];
        }
    }

    return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {

    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart ? `${formattedIntegerPart}.${fractionalPart}` : formattedIntegerPart;
}


export const prepareExpenseBarChartData = (data = []) => {
    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount || 0,
        category: item?.category || 'Unknown',
    }));

    return chartData;
}

export const prepareIncomeBarChartData = (data = []) => {
    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount || 0,
        source: item?.source || 'Unknown',
    }));

    return chartData;
}

export const prepareExpenseLineChartData = (data = []) => {
    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        date: moment(item?.date).format('Do MMM'),
        amount: item?.amount || 0,
        category: item?.category || 'Unknown',
    }));

    return chartData;
}
