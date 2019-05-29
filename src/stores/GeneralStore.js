import { observable, action } from 'mobx'

export class GeneralStore {
    @observable input
    @observable chosenPlayer = ""

    @action handleInput = event => {
        this.input = event.target.value
    }

    @action handleChosePlayer = event => {
        this.chosenPlayer = event.target.value
    }
}