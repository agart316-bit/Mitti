// The twelve glass illustrations (one portrait SVG per state, 600 x 800), keyed by state slug.
// Copies of ../mitti-glasses/ with the flat #background rect removed, so the glass sits on the state's ink block.
import assam from './assets/glasses/assam.svg'
import bihar from './assets/glasses/bihar.svg'
import goa from './assets/glasses/goa.svg'
import gujarat from './assets/glasses/gujarat.svg'
import karnataka from './assets/glasses/karnataka.svg'
import kerala from './assets/glasses/kerala.svg'
import madhyaPradesh from './assets/glasses/madhya-pradesh.svg'
import rajasthan from './assets/glasses/rajasthan.svg'
import sikkim from './assets/glasses/sikkim.svg'
import uttarPradesh from './assets/glasses/uttar-pradesh.svg'
import uttarakhand from './assets/glasses/uttarakhand.svg'
import westBengal from './assets/glasses/west-bengal.svg'

export const glassImg = {
  assam, bihar, goa, gujarat, karnataka, kerala,
  'madhya-pradesh': madhyaPradesh, rajasthan, sikkim,
  'uttar-pradesh': uttarPradesh, uttarakhand, 'west-bengal': westBengal,
}
