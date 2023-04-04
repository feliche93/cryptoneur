function currencyFormatter({ amount, currency, lang, minimumFractionDigits = 0 }: {
    amount: number
    currency?: string
    minimumFractionDigits?: number
    lang?: string
}) {
    return new Intl.NumberFormat(lang ?? 'en-US', {
        style: 'currency',
        currency: currency ?? 'USD',
        minimumFractionDigits,
        maximumFractionDigits: minimumFractionDigits,
    }).format(amount)
}

function ordinal_suffix_of(i: number) {
    var j = i % 10,
        k = i % 100
    if (j == 1 && k != 11) {
        return i + 'st'
    }
    if (j == 2 && k != 12) {
        return i + 'nd'
    }
    if (j == 3 && k != 13) {
        return i + 'rd'
    }
    return new Intl.NumberFormat().format(i) + 'th'
}

export { currencyFormatter, ordinal_suffix_of }