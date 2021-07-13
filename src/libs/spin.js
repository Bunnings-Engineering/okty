import ora from 'ora';
import _ from 'lodash';

/**
 * Show spinner when doing action.
 */
export default class spin {
  /**
   * Spin and do..
   * @param {func()} func function to do
   * @param {string} start msg to show before doing action
   * @param {string} succeed msg to show when action has succeeded
   * @param {string} fail msd to show when action has failed
   */
  static async do(func, start, succeed, fail) {
    if (!_.isFunction(func)) {
      return;
    }

    const spinner = ora(start).start();

    try {
      await func();

      if (!_.isEmpty(succeed)) spinner.succeed(succeed);
      else {
        spinner.stop();
      }
    } catch (err) {
      if (!_.isEmpty(fail)) spinner.fail(fail);
      else {
        spinner.stop();
      }

      console.error(err);
    }
  }
}