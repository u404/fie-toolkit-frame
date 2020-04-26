export default (value) => value ? (value + "").replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") : ""
