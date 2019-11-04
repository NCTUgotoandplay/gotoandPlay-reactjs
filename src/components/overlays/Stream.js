import React, { Component } from "react"

import { makeStyles } from '@material-ui/core/styles';


import PlayCircleFilledIcon from '@material-ui/icons/PlayArrow';
import PauseCircleFilledIcon from '@material-ui/icons/Pause';
import Fab from '@material-ui/core/Fab';

import Tooltip from '@material-ui/core/Tooltip';

import Slider from '@material-ui/core/Slider';

import IconButton from '@material-ui/core/IconButton';

import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import FastRewindIcon from '@material-ui/icons/FastRewind';
import FastForwardIcon from '@material-ui/icons/FastForward';

const useStyles = makeStyles(theme => {
  return({
      panel: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
      }
    });
});


function Stream(props) {
  let classes = useStyles();
  let [panel, setPanel] = React.useState('text');
    return (
      <div className="stream">
        <div className={"bar "+classes.panel}>
          <div className="text">
            {panel === 'text'?
            <marquee scrollamount="4" startvisable="true">
              {props.player.title}
            </marquee>
            :
            panel === 'control'?
            <div style={{display: 'flex'}}>
              <div style={{display: 'flex', marginTop: '5px', height: '30px', 'padding-right': '5px'}}>
                <Tooltip title={props.localize.skip_previous}><IconButton disabled size="small" onClick={()=> {

                }}>
                  <SkipPreviousIcon/>
                </IconButton></Tooltip>
              </div>
              <div style={{display: 'flex', marginTop: '5px', height: '30px', 'padding-right': '5px'}}>
                <Tooltip title={props.localize.fast_rewind}><IconButton size="small" onClick={(e) => props.actions.FastRewindAudio(e)}>
                  <FastRewindIcon />
                </IconButton></Tooltip>
              </div>
              <div style={{display: 'flex', marginTop: '5px', height: '30px', 'padding-right': '5px'}}>
                <Tooltip title={props.localize.fast_forward}><IconButton size="small" onClick={(e) => props.actions.FastForwardAudio(e)}>
                  <FastForwardIcon/>
                </IconButton></Tooltip>
              </div>
              <div style={{display: 'flex', marginTop: '5px', height: '30px'}}>
                <Tooltip title={props.localize.skip_next}><IconButton disabled size="small" onClick={()=> {

                }}>
                  <SkipNextIcon/>
                </IconButton></Tooltip>
              </div>
            </div>
            :
            <div style={{display: 'flex'}}>
              <div style={{width: '100px', display: 'flex', height: '40px', 'padding-top': '9px', 'padding-right': '5px'}}>
                <Slider
                  value={3}
                  onChange={()=>{}}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
              </div>
            </div>
            }
          </div>
          <div className="switch">
            <Tooltip title={props.localize.switch}>
              <IconButton size="small" onClick={
                ()=> {
                  if(panel === 'text') {
                    setPanel('control');
                  }
                  else {
                    setPanel('text');
                  }
                }
              }><UnfoldMoreIcon/></IconButton>
            </Tooltip>

          </div>
        </div>
        {props.player.playing?
          <Tooltip title={props.localize.pause_playing?props.localize.pause_playing:'continue'}>
            <Fab className={classes.panel} size="medium" onClick={props.onClick}>
              <PauseCircleFilledIcon />
            </Fab>
          </Tooltip>
          :
          <Tooltip title={props.localize.continue_playing?props.localize.continue_playing:'pause'}>
            <Fab className={classes.panel} size="medium"
            onClick={(e) => props.actions.switchMainStream(e)}>
              <PlayCircleFilledIcon />
            </Fab>
          </Tooltip>
          }
      </div>
  );
}

export default Stream;
