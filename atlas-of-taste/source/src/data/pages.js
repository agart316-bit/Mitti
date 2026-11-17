// Every state with a finished page. Anything missing here falls back to the "coming soon" stub.
import goa from './goa.js'
import karnataka from './karnataka.js'
import kerala from './kerala.js'
import westBengal from './west-bengal.js'
import bihar from './bihar.js'
import sikkim from './sikkim.js'
import assam from './assam.js'
import uttarPradesh from './uttar-pradesh.js'
import uttarakhand from './uttarakhand.js'
import madhyaPradesh from './madhya-pradesh.js'
import rajasthan from './rajasthan.js'
import gujarat from './gujarat.js'

export const detailed = {
  goa, karnataka, kerala, 'west-bengal': westBengal, bihar, sikkim, assam,
  'uttar-pradesh': uttarPradesh, uttarakhand, 'madhya-pradesh': madhyaPradesh, rajasthan, gujarat,
}
