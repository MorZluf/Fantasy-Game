import { observable, action } from 'mobx'

export class FightStore {
    @observable dummyCheck = "check"

    @observable player = null
    @observable opponent = null
    @observable playerRoll = null
    @observable oponentRoll = null

    @observable playerSubmit = false
    @observable opponentSubmit = false

    @observable playerStats = {} // ??
    @observable opponentStats = {} // ??  do i need it ? s

    
    @action functionName = () => {
        
    }
}