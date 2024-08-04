import React from 'react'
import Helmet from 'react-helmet' //html ma head na title jevu


function MetaData({title}) {
  return (
    <>
        <Helmet>
            <title>{title}</title>
            {/* //html ma head na title jevu
            //differ differ page ma differ title aapva maate */}
        </Helmet>
    </>
  )
}

export default MetaData


//https://stackoverflow.com/questions/66045965/warning-using-unsafe-componentwillmount-in-strict-mode-is-not-recommended-upgr


