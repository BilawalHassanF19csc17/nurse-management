// Use a global object to persist the timers array across requests
global.timers = global.timers || [];

export function getTimers() {
    return global.timers;
}

export function addTimers(key) {
    global.timers = [...global.timers, key];
    return global.timers;
}

export function expiredTimers(id){
    global.timers = global.timers.filter(timer => timer.id !== id);
 }

export function removeTimers(newTimers) {
    if (newTimers.length > 0) {
        clearTimeout(newTimers[0].timeoutID);
        global.timers = global.timers.filter(timer => timer.id !== newTimers[0].id);
        return true
    } else {
        return false 
    }
}

export default { getTimers, addTimers, removeTimers, expiredTimers };
