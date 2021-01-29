export const bgColorInput = (screens) => {
    let baseInput = [];

    for (let i = 0; i < screens - 1; i++) {
        baseInput.push(i);
        baseInput.push(i+0.5);
        baseInput.push(i+0.501);
        baseInput.push(i+1);
    }

    return baseInput;
};

export const bgColorOutput = (colors) => {
    let bgColors = [];

    while(colors.length > 1) {
        bgColors.push(colors[0]);
        bgColors.push(colors[0]);
        bgColors.push(colors[1]);
        bgColors.push(colors[1]);

        colors.shift();
    }

    return bgColors;
};

export const transformInput = (screens) => {
    let baseInput = [];

    for (let i = 0; i < screens - 1; i++) {
        baseInput.push(i);
        baseInput.push(i+0.5);
        baseInput.push(i+1);
    }

    return baseInput;
}

export const rotateY_CircleInput = (screens) => {
    let baseInput = [];
    let deg = 0;

    for (let i = 0; i < screens - 1; i++) {
        baseInput.push(deg);
        baseInput.push(deg-90);
        baseInput.push(deg-180);

        deg = baseInput[i*3 + 2];
    }

    return baseInput;
}