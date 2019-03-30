import React, { Component } from 'react';

class AboutUS extends React.Component {
  render () {
    return (
      <div className="section aboutpage">
        <div className="container">
          <div className="top">
          </div>
          <div className="item-b">
          </div>
          <div className="mail">
            <h2>聯絡我們</h2>
            <input id="input_nickname" placeholder="暱稱" type="text"/>
            <input id="input_email" placeholder="e-mail" type="text"/>
            <input id="input_message" placeholder="訊息" type="text"/>
            <button>送出</button>
          </div>
          <div className="about">
            <h2>關於電台</h2>
            <p>交大網路電台goto&Play自開播以來，<br/>
            就一直是系上熱門的話題組織，<br/>
            直到今日電台組織架構及人數持續增長茁壯，<br/>
            相信未來交大網路電台goto&Play也將會持續為聽眾獻上<br/>
            最不一樣的好聲音。</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUS;
