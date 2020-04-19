import React from 'react'
import PropTypes from 'prop-types'
import emojione from 'emojione'

const Emoji = ({name}) => <div className="Emoji">{emojione.shortnameToUnicode(name)}</div>

Emoji.propTypes = {name: PropTypes.string.isRequired}

export default Emoji
