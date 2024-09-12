const saveSoldiers = (arr) => {
    localStorage.setItem('soldiers', JSON.stringify(arr));    
}

const loadSoldiers = () => {
    return JSON.parse(localStorage.getItem('soldiers'));
}

const addSoldier = (soldier) => {
    const soldiers = loadSoldiers() || [];
    if (!soldiers.some(s => s.name === soldier.name)) {
        soldiers.push(soldier);
        saveSoldiers(soldiers);
    } else {
        alert('Soldier already exists');
    }
}

const getSoldiers = () => {
    return loadSoldiers() || [];
}

const getSoldierByName = (name) => {
    const soldiers = loadSoldiers();
    return soldiers.find(s => s.name === name);
}

const removeSoldier = (soldier) => {
    const soldiers = loadSoldiers();
    const newSoldiers = soldiers.filter(s => s.name !== soldier.name);
    saveSoldiers(newSoldiers);
}

const updateSoldier = (soldier) => {
    const soldiers = loadSoldiers();
    const newSoldiers = soldiers.map(s => s.name === soldier.name ? soldier : s);
    saveSoldiers(newSoldiers);
}

const clearSoldiers = () => {
    saveSoldiers([]);
}

const form = document.querySelector('.form');
const inputs = document.querySelectorAll('.input');
const firstContainer = document.querySelector('.firstContainer');
const secondContainer = document.querySelector('.secondContainer');

const showSection = (section) => {
    if (section === 'edit') {
        firstContainer.classList.add('hidden');
        secondContainer.classList.remove('hidden');
    } else {
        firstContainer.classList.remove('hidden');
        secondContainer.classList.add('hidden');
    }
}

const addRow = (soldier) => {
    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    const row = document.createElement('tr');
    const nameTd = document.createElement('td');
    const rankTd = document.createElement('td');
    const positionTd = document.createElement('td');
    const platoonTd = document.createElement('td');
    const missionTimeTd = document.createElement('td');
    const statusTd = document.createElement('td');
    const actionTd = document.createElement('td');
    nameTd.textContent = soldier.name;
    rankTd.textContent = soldier.rank;
    positionTd.textContent = soldier.position;
    platoonTd.textContent = soldier.platoon;
    missionTimeTd.textContent = soldier.missionTime;
    statusTd.textContent = soldier.status;

    const remove = document.createElement('button');
    remove.classList.add('remove');
    remove.textContent = 'Remove';
    
    const mission = document.createElement('button');
    mission.classList.add('mission');
    mission.textContent = 'Mission';
    
    const edit = document.createElement('button');
    edit.classList.add('edit');
    edit.textContent = 'Edit';
    
    actionTd.appendChild(remove);
    actionTd.appendChild(mission);
    actionTd.appendChild(edit);

    row.appendChild(nameTd);
    row.appendChild(rankTd);
    row.appendChild(positionTd);
    row.appendChild(platoonTd);
    row.appendChild(missionTimeTd);
    row.appendChild(statusTd);
    row.appendChild(actionTd);
    row.classList.add('tableBody');
    tbody.appendChild(row);

    remove.addEventListener('click', () => {
        removeSoldier(soldier);
        tbody.removeChild(row);
    });

    mission.addEventListener('click', () => {
        let timeLeft = parseInt(soldier.missionTime, 10);
        mission.textContent = `Mission: ${timeLeft}s`;
        const interval = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(interval);
                mission.textContent = 'Mission Completed';
            } else {
                mission.textContent = `Mission: ${timeLeft}s`;
            }
        }, 1000);
    });

    edit.addEventListener('click', () => {
        showSection('edit');
        inputs.forEach(input => {
            input.value = soldier[input.name] || '';
        });
    });
};

window.addEventListener('load', () => {
    const savedSoldiers = getSoldiers();
    savedSoldiers.forEach(soldier => {
        addRow(soldier);
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const soldier = {};
    inputs.forEach(input => {
        if (input.type === 'select-one' || input.type === 'text') {
            soldier[input.name] = input.value;
        }
    });

    addRow(soldier);
    addSoldier(soldier);
    showSection('home');
});
