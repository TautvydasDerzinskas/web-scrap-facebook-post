const moment = require('moment-timezone')

class CronJobTask {
  constructor (cronJob, cronJobService) {
    this.cronJob = cronJob
    this.cronJobService = cronJobService
  }

  start () {
    this.cronJobService._startChronJob(this.cronJob)
    console.log(`<${this.cronJob.description}> is running`)
  }

  stop () {
    this.cronJobService._stopChronJob(this.cronJob)
  }
}

class CronJobService {
  constructor () {
    if (!global.WSCF_CHRON_JOBS) {
      global.WSCF_CHRON_JOBS = {
        available: [],
        running: []
      }

      setInterval(this.checkChronJobs.bind(this), 60000)
    }
  }

  addChronJob (cronJobDescription) {
    const newChronJobTask = new CronJobTask(cronJobDescription, this)
    global.WSCF_CHRON_JOBS.available.push(newChronJobTask)

    return newChronJobTask
  }

  checkChronJobs () {
    console.log('Running cron sheadule check')
    const currentDate = new Date()
    global.WSCF_CHRON_JOBS.running.forEach(task => {
      const taskTimezoneDate = task.timezone ? moment.tz(currentDate, task.timezone) : moment.tz(currentDate)
      const currentTime = taskTimezoneDate.format('HH:mm')

      if (task.days.indexOf(parseInt(taskTimezoneDate.day()) >= 0)) {
        try {
          task.times.forEach(time => {
            if (time === currentTime) {
              task.job()
              throw new Error()
            }
          })
        } catch (error) {
          console.log(`${currentTime} - ${task.description} (Cron job executed)`)
          process.stdin.resume()
        }
      }
    })
  }

  _startChronJob (chronJobTask) {
    global.WSCF_CHRON_JOBS.running.push(chronJobTask)
  }

  _stopChronJob (chronJobTask) {
    const chronJobTaskIndex = global.WSCF_CHRON_JOBS.running.indexOf(chronJobTask)
    if (chronJobTaskIndex >= 0) {
      global.WSCF_CHRON_JOBS.running.splice(chronJobTaskIndex, 1)
    }
  }
}

module.exports = new CronJobService()
