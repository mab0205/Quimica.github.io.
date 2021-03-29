/**
 * @author André Zambroni Riedel, João Pedro Cunha Guska, Martin Ávila Buitrón, Samuel Damiani Frigotto
 * @RA 2264900, 2264994, 2274183, 2266113
 * @desc código do Controller do site (regras de negócio)
 */
class Controller {
    constructor() {
        this.formEl = document.getElementById('form-conversao');

        this.elemento1El = document.getElementById('elemento1');
        this.elemento2El = document.getElementById('elemento2');

        this.qtdAtomos1El = document.getElementById('qtdAtomos1');
        this.qtdAtomos2El = document.getElementById('qtdAtomos2');

        this.massaMolar1;
        this.massaMolar1;

        this.elementos = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe'];

        this.massasAtomicas = [1.00794, 4.002602, 6.941, 9.012182, 10.811, 12.0107, 14.0067, 15.9994, 18.9984032, 20.1797, 22.98976928, 24.305, 26.9815386, 28.0855, 30.973762, 32.065, 35.453, 39.948, 39.0983, 40.078, 44.955912, 47.867, 50.9415, 51.9961, 54.938045, 55.845, 58.933195, 58.6934, 63.546, 65.38, 69.723, 72.64, 74.9216, 78.96, 79.904, 83.798, 85.4678, 87.62, 88.90584, 91.224, 92.90638, 95.96, 98, 101.07, 102.9055, 106.42, 107.8682, 112.411, 114.818, 118.71, 121.76, 127.6, 126.90447, 131.293];

        this.dados = {};
        this.resultado;

        this.initialize();
    }

    imprime(massaMolarF) {
        let formulaEl = document.getElementById('formula'); /* elemento HTML onde será mostrado a fórmula do composto */
        let massaMolarEl = document.getElementById('massaMolar'); /* elemento HTML onde será mostrado a massa molar final */
        let resultadoEl = document.getElementById('resultado'); /* elemento HTML onde será mostrado o resultado da conversão mássica */

        let compostoText; /* variável que armazena a fórmula do composto */

        if (this.dados.qtd <= 0) {
            /* bloco caso  a quantidade a ser convertida seja menor ou igual a 0 */
            formulaEl.innerHTML = '--';
            massaMolarEl.innerHTML = '--';
            resultadoEl.innerHTML = '--';
            console.log('caiu aqui');
        } else {
            if (this.dados.qtdMol == 1) {
                compostoText = '';
            } else {
                compostoText = this.dados.qtdMol;
            }

            if (this.dados.qtdAtomos1 == 1) {
                compostoText = compostoText + this.dados.elemento1;
            } else {
                compostoText = compostoText + this.dados.elemento1;
                compostoText = compostoText + '<sub>' + this.dados.qtdAtomos1 + '</sub>';
            }

            if (this.dados.qtdAtomos2 == 1) {
                compostoText = compostoText + this.dados.elemento2;
            } else if(this.dados.qtdAtomos2 !== 0){
                compostoText = compostoText + this.dados.elemento2;
                compostoText = compostoText + '<sub>' + this.dados.qtdAtomos2 + '</sub>';
            }

            formulaEl.innerHTML = compostoText;
            massaMolarEl.innerHTML = Math.round(massaMolarF * 100) / 100 + ' g/mols';
            if (this.dados.radios == 'mol') {
                resultadoEl.innerHTML = (Math.round(this.resultado * 100) / 100).toString() + ' g';
            } else {
                resultadoEl.innerHTML = (Math.round(this.resultado * 100) / 100).toString() + ' mols';
            }
        }
    }

    calc() {
        this.massaMolar1 = this.massasAtomicas[this.elementos.indexOf(this.dados.elemento1)];

        if (this.dados.elemento2 == '') {
            this.massaMolar2 = 0;
        } else {
            this.massaMolar2 = this.massasAtomicas[this.elementos.indexOf(this.dados.elemento2)];
        }

        let massaMolarF = eval(this.dados.qtdMol) * this.massaMolar1 * eval(this.dados.qtdAtomos1) + eval(this.dados.qtdMol) * this.massaMolar2 * eval(this.dados.qtdAtomos2);

        if (this.dados.radios == 'mol') {
            this.resultado = this.dados.qtd * massaMolarF;
        } else {
            this.resultado = this.dados.qtd / massaMolarF;
        }
        this.imprime(massaMolarF);
    }

    getValues() {
        [...this.formEl.elements].forEach((field) => {
            /* percorre todos os elementos do formulário */
            if (field.name == 'radios') {
                /* bloco especial para os elementos do tipo radio */
                if (field.checked) {
                    this.dados[field.name] = field.value;
                }
            } else if (field.name !== 'submit') {
                /* adiciona ao objeto os valores inseridos no formulário (menos os valores do botão submit) */
                this.dados[field.name] = field.value;
            }
        });

        if (this.dados.qtdMol == '') {
            /* caso o usuário não tenha inserido a quantidade de mols */
            this.dados.qtdMol = 1;
        }
        if (this.dados.elemento1 !== '' && this.dados.qtdAtomos1 == '') {
            /* caso o usuário não tenha inserido a quantidade de átomos do elemento 1 */
            this.dados.qtdAtomos1 = 1;
        }
        if (this.dados.elemento2 !== '' && this.dados.qtdAtomos2 == '') {
            /* caso o usuário não tenha inserido a quantidade de átomos do elemento 2 */
            this.dados.qtdAtomos2 = 1;
        }
        if (this.dados.elemento2 == '') {
            /* caso o usuário não tenha escolhido um segundo elemento, o valor da quantidade será zero */
            this.dados.qtdAtomos2 = 0;
        }
    }

    initialize() {
        this.formEl.addEventListener('submit', (event) => {
            /* bloco de ação do evento submit */
            event.preventDefault(); /* reseta as configurações padrão de submit */
            this.getValues(); /* chama método que obtém os dados do formulário */
            this.calc(); /* chama método que faz a conversão mássica */
        });

        this.elemento2El.addEventListener('change', (event) => {
            /* bloco de ação do evento chande do elemento 2 */
            this.getValues(); /* chama método que obtém os dados do formulário */
            if (this.dados.elemento2 == '') {
                /* bloco caso o usuário não tenha selecionado o segundo elemento */
                this.qtdAtomos2El.disabled = true; /* desativa a opção de inserir a quantidade de átomos */
                this.qtdAtomos2El.value = 0; /* coloca o valor da quantidade de átomos em 0 */
            } else {
                /* bloco caso o usuário tenha selecionado o segundo elemento */
                this.qtdAtomos2El.disabled = false; /* ativa a opção de inserir a quantidade de átomos */
            }
        });
    }
}
