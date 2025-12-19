const rock = document.createElement('button');
rock.textContent = 'Rock';
rock.onclick = () => {
    const randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < 1/3) {
        alert('you select rock');
    } 
    else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        alert('you select paper');
    } 
    else if (randomNumber >= 2/3 && randomNumber < 1) {
        alert('you select scissors');
    }
};
document.body.appendChild(rock);

const paper = document.createElement('button');
paper.textContent = 'Paper';
paper.onclick = () => {
    const randomNumber = Math.random();
    if (randomNumber >= 1/3 && randomNumber < 2/3) {
        alert('you select paper');
    } 
    else if (randomNumber >= 0 && randomNumber < 1/3) {
        alert('you select rock');
    } 
    else if (randomNumber >= 2/3 && randomNumber < 1) {
        alert('you select scissors');
    }
};
document.body.appendChild(paper);

const scissors = document.createElement('button');
scissors.textContent = 'Scissors';
scissors.onclick = () => {
    const randomNumber = Math.random();
    if (randomNumber >= 2/3 && randomNumber < 1) {
        alert('you select scissors');
    } 
    else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        alert('you select paper');
    } 
    else if (randomNumber >= 0 && randomNumber < 1/3) {
        alert('you select rock');
    }
};
document.body.appendChild(scissors);
