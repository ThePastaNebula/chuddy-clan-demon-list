import List from '/chuddy-clan-demon-list/js/pages/List.js';
import Leaderboard from '/chuddy-clan-demon-list/js/pages/Leaderboard.js';
import Roulette from '/chuddy-clan-demon-list/js/pages/Roulette.js';

export default [
    { path: '/', component: List },
    { path: '/leaderboard', component: Leaderboard },
    { path: '/roulette', component: Roulette },
];
