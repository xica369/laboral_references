import trae from 'trae'
import configService from './config'

const laboralReferenceService = trae.create ({
    baseUrl: configService.apiUrl
})

export default laboralReferenceService