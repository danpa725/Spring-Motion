export const handleInput = (mass, damper, stiffness) => {
    if (!mass && !damper && !stiffness) return;
    let zetta = 0;

    if (mass && damper && stiffness) {
        zetta = damper / (2 * Math.sqrt(mass * stiffness));
    }

    if (zetta >= 0 && zetta <= 1) {
        const wn = stiffness / Math.sqrt(mass);
        const wd = wn * Math.sqrt(1 - zetta * zetta);
        return { zetta, wn, wd };
    }
};
