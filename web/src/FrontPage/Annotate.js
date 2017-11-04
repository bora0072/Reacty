import React, { Component } from 'react';
import retext from 'retext';
import vfile from 'vfile';

import keywords from 'retext-keywords';
import nlcstToString from 'nlcst-to-string';



var obj=`Please submit an updated project proposal (~2 pages in length) with the following information:
Title of your project
Names of team members
Abstract
Detailed plan of work, including timeline
Summary/overview of previous/related work in the topic area`

retext()
    .use(keywords)
    .process(obj, function (err, file) {
      if (err) throw err;

      console.log('Keywords:');
      file.data.keywords.forEach(function (keyword) {
        console.log(nlcstToString(keyword.matches[0].node));
      });

      console.log();
      console.log('Key-phrases:');
      file.data.keyphrases.forEach(function (phrase) {
        console.log(phrase.matches[0].nodes.map(nlcstToString).join(''));
      });
    }
  );

class Annotate extends Component{
  constructor(){
    super();
    //this.retext=this.retext.bind(this);
  }


  render(){
    return (
      <h1>hello world</h1>
)}
}

// class ExampleList extends Component{
//   render(){
//     return (
//     <h1>hello</h1>
//     )
//   }
// };

export default Annotate;
