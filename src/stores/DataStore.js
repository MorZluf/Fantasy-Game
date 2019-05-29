import { observable, action } from 'mobx'
import axios from 'axios'

export class DataStore {
    @observable charClass = {}
    @observable enemy = {}
    @observable follower = {}
    @observable item = {}
    @observable tile = {}

    @action getClass = async className => { 
        let classData = await axios.get(`http://localhost:8000/classes/${className}`)
        this.charClass = {...classData.data}
        return this.charClass
    }
}