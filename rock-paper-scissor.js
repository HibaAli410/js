const rock = document.createElement('button');
rock.textContent = 'Rock';
rock.onclick = () => {
    const randonNumber = math.random();
    if (randonNumber <= 0 && randonNumber < 1/3) {
        alert('you select rock');
    } 
    else if(randonNumber >= 1 / 3 && randonNumber < 2/3){
        alert('you select paper');
    } 
    else if(randonNumber >= 2 / 3 && randonNumber < 1){
        alert('you select scissors');
    }
};
document.body.appendChild(rock);

const paper = document.createElement('button');
paper.textContent = 'Paper';
paper.onclick = () => alert('Paper clicked!');
document.body.appendChild(paper);

const scissors = document.createElement('button');
scissors.textContent = 'Scissors';
scissors.onclick = () => alert('Scissors clicked!');
document.body.appendChild(scissors);


