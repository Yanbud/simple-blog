module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
    },
    img_num: () => {
        return Math.floor(Math.random() * 10)
    }
};