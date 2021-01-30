import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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

export const rotateY_CircleOutput = (screens) => {
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

export const scale_CircleOutput = (screens) => {
    let baseInput = [];

    for (let i = 0; i < screens - 1; i++) {
        baseInput.push(1);
        baseInput.push(8);
        baseInput.push(1);
    }

    return baseInput;
}

export const translateX_CircleOutput = (screens, perspective) => {
    let baseInput = [];
    let adjustment;

    switch (perspective) {
        case 150:
            adjustment = 56;
            break;
        case 200:
            adjustment = 48;
            break;
        case 300:
            adjustment = 32;
            break;
        case 400:
            adjustment = 16;
            break;
    }

    for (let i = 0; i < screens - 1; i++) {
        baseInput.push(0);
        baseInput.push(width/adjustment);
        baseInput.push(0);
    }

    return baseInput;
}
export const rotateY_CircleButtonOutput = (screens) => {
    let baseInput = [];
    let baseValue = 180;

    for (let i = 0; i < screens - 1; i++) {
        baseInput.push(i*baseValue);
        baseInput.push((i+1)*baseValue);
        baseInput.push((i+1)*baseValue);
    }

    return baseInput;
}

export const textOpacityInput = (screens) => {
    let baseInput = [];

    for (let i = 0; i < screens - 1; i++) {
        baseInput.push(1);
        baseInput.push(0);
        baseInput.push(0);
        baseInput.push(1);
    }

    return baseInput;
}

export const textOpacityOutput = (screens) => {
    let baseInput = [];

    for (let i = 0; i < screens - 1; i++) {
        baseInput.push(i);
        baseInput.push(i+0.5);
        baseInput.push(i+0.8);
        baseInput.push(i+1);
    }

    return baseInput;
}