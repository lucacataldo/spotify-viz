import Visualizer from './classes/visualizer'
import { interpolateRgb, interpolateBasis } from 'd3-interpolate'
import { getRandomElement } from './util/array'
import { sin, circle, polygon } from './util/canvas'

export default class Example extends Visualizer {
  constructor() {
    super({ volumeSmoothing: 10 })
    this.theme = ['#F7567C', '#F5B82E', '#5E4AE3']
  }

  hooks() {
    this.sync.on('bar', beat => {
      this.lastColor = this.nextColor || getRandomElement(this.theme)
      this.nextColor = getRandomElement(this.theme.filter(color => color !== this.nextColor))
    })
  }

  paint({ ctx, height, width, now }) {
    const bar = interpolateBasis([0, this.sync.volume * 10, 0])(this.sync.bar.progress)
    const beat = interpolateBasis([0, this.sync.volume * 300, 0])(this.sync.beat.progress)
    
    let brightness = beat /100 ;
    ctx.fillStyle = `hsla(73, 0%, ${5-brightness}%, 0.5)`
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = "#ffffff";

    ctx.beginPath();
    const points = polygon(3+(6 * (beat/100) ), 100 + (bar * 10), width / 2, height / 2, this.sync.beat.progress*270)
    points.forEach((e, i) => {
      ctx.lineTo(e.x, e.y)
    })
    ctx.closePath()
    ctx.stroke()

    if (beat > 100) {
      ctx.beginPath()
      polygon(3, 50, width/2, height/2, 90).forEach(e=>{
        ctx.lineTo(e.x, e.y)
      })
      ctx.closePath()
      ctx.fillStyle = "#7D6167"
      ctx.fill()
    }

    
  }
}