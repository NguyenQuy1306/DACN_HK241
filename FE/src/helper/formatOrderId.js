function generateDisplayBookingId(id) {
    const randomLetters = Array.from({ length: 3 }, () =>
        String.fromCharCode(65 + Math.floor(Math.random() * 26)),
    ).join("");
    const paddedId = id.toString().padStart(6, "0");
    return `${randomLetters}${paddedId}`;
}

export default generateDisplayBookingId;
