import { observable, action } from 'mobx'

export class FightStore {
    @observable dummyCheck = "check"

    @observable player = null
    @observable opponent = null
    @observable playerRoll = null
    @observable opponentRoll = null

    @observable playerSubmit = false
    @observable opponentSubmit = false

    @observable playerStats = {} 
    @observable opponentStats = {} 

    
    @action functionName = () => {
        
    }
}