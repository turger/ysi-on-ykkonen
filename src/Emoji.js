import React from 'react'
import PropTypes from 'prop-types'
import emojione from 'emojione'

const Emoji = ({name}) => <div className="Emoji" dangerouslySetInnerHTML={{__html: emojione.shortnameToImage(name)}}/>

Emoji.propTypes = {name: PropTypes.string.isRequired}

export default Emoji
