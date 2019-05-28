import { observable, action } from 'mobx'

export class StoreName {
    @observable input
    @action handleInput = event => {
        this.input = event.target.value
    }
}