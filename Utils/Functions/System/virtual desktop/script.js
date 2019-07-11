const screenManager = Bean("screenManager");

/**
 * obtains the width of user's screen
 * @returns {number} width of user's screen in pixels
 */

function getScreenWidth() {
    return screenManager.getScreenWidth();
}

/**
 * obtains the height of user's screen
 * @returns {number} height of user's screen in pixels
 */

function getScreenHeight() {
    return screenManager.getScreenHeight();
}
