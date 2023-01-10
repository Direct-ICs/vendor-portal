export const spaceAndCapitalize = (string) => {
    string = string.charAt(0).toUpperCase() + string.slice(1);
    return string.replace(/_/g, ' ');
}

export const formatDate = (date) => {
    const parts = date.split('-');
    const months = {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec'
      };
    const month = parseInt(parts[1]);
    const newDate = `${parts[2]} ${months[month]} ${parts[0]}`;

    return newDate;
}

export const formatPrice = (price, currencyType = 'en-US', currency = "USD") => {
    return price.toLocaleString(currencyType, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0
    });
}

export const getTimeOfDay = () => {
    const hour = new Date().getHours();
    return hour >= 12
        ? hour >= 18
            ? 'Good evening'
            : 'Good afternoon'
        : 'Good morning';
}

export const billNumToId = () => {
    const bills = JSON.parse(sessionStorage.getItem('bills'));
    const numToId = {}
    bills.map((bill) => {
        numToId[bill.bill_number] = bill.bill_id;
        return bill;
    });

    return numToId;
}