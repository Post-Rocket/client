'use strict';

// Helper function to promisify a function.
export const promisify = (
  f,
  passResolveToFuncAsLastArgument,
  makeAsync = f && f.constructor.name.toLowerCase().includes('async')
) => makeAsync && (
  passResolveToFuncAsLastArgument && 
    function (...args) {
      return new Promise(async function (resolve, reject) {
        try {
          if (resolve) await f(...args, resolve);
          else await f(...args);
        } catch (e) {
          if (reject) reject(e);
          else throw e;
        }
      });
    } || function (...args) {
      return new Promise(async function (resolve, reject) {
        try {
          const res = await f(...args);
          resolve && resolve(res);
        } catch (e) {
          if (reject) reject(e);
          else throw e;
        }
      });
    }
) || (
  passResolveToFuncAsLastArgument &&
  function (...args) {
    return new Promise(function (resolve, reject) {
      try {
        if (resolve) f(...args, resolve);
        else f(...args);
      } catch (e) {
        if (reject) reject(e);
        else throw e;
      }
    });
  } || function (...args) {
    return new Promise(function (resolve, reject) {
      try {
        const res = f(...args);
        resolve && resolve(res);
      } catch (e) {
        if (reject) reject(e);
        else throw e;
      }
    });
  }
);

// Exports.
export default Object.freeze(Object.defineProperty(promisify, 'promisify', {
  value: promisify
}));

// Node.js exports.
try {
  module.exports = promisify;
} catch {}