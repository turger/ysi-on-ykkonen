import React from 'react'
import PropTypes from 'prop-types'
import {emojify} from 'react-emojione';

const Emoji = ({name}) => <div className="Emoji">{emojify(name)}</div>

Emoji.propTypes = {name: PropTypes.string.isRequired}

export default Emoji
