export const bgColorInput = (screens) => {
    let baseInput = [0, 0.5, 0.501, 1];

    if (screens == 2) {
        return baseInput;
    } else {
        for (let i = screens - 2; i < screens - 1; i++) {
            baseInput.push(i);
            baseInput.push(i+0.5);
            baseInput.push(i+0.501);
            baseInput.push(i+1);
        }

        return baseInput;
    }
};