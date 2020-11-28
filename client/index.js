import { auth } from './classes/sync'
import Template from './template'
import Example from './example'

if (window.location.hash === '#start') {
  const example = new Example()
} else {
  auth()
}