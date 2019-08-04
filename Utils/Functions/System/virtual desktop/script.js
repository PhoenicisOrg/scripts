const screenManager = Bean("screenManager");

/**
 * Obtains the width of user's screen
 * @returns {number} width of user's screen in pixels
 */
// eslint-disable-next-line no-unused-vars
function getScreenWidth() {
    return screenManager.getScreenWidth();
}

/**
 * Obtains the height of user's screen
 * @returns {number} height of user's screen in pixels
 */
// eslint-disable-next-line no-unused-vars
function getScreenHeight() {
    return screenManager.getScreenHeight();
}
