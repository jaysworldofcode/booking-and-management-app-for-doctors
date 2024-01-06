export default (status) => {
    var config = {}

    if(status == 0){
        config.name = 'Created'
        config.color = 'blue'
    }else if(status == 1){
        config.name = 'Success'
        config.color = 'green'
    }else if(status == 2){
        config.name = 'Cancelled'
        config.color = 'red'
    }else{
        config.name = 'Rescheduled'
        config.color = 'orange'
    }

    return config
}