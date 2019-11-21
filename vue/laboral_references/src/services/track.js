import laboralReferenceService from './laboral-references'

const trackService = {}

trackService.search = function (q) {
    const type = 'track'
    return laboralReferenceService.get('/laboral_references', {
        params: {
            q: q
        }
    })
    .then(res  => res.data)
}

export default trackService