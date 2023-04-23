import React from 'react';
import {Form, FormGroup, Label, Input, Button, Container, Col } from "reactstrap";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import database from './utils/db';
import { SubmitError } from './utils/Errors';
import { useNavigate } from 'react-router';

import config from './../config';
const db = new database(config.database_collection);
const dbcol = config.database_collection
const disabled = config.disable_submitting

const formData = Object({
  teamNum: 0,
  matchNum: 0,
  allianceColor: '',
  autoScoredObjectsLow: 0,
  autoScoredObjectsMid: 0,
  autoScoredObjectsHigh: 0,
  autoMoved: Boolean,
  teleScoredObjectsLow: 0,
  teleScoredObjectsMid: 0,
  teleScoredObjectsHigh: 0,
  scorableObjects: '',
  balanceLevel: '',
  finalScoreBlue: 0,
  finalScoreRed: 0,
  notes: 'None',
})
const Entry = (props) => {
  var navigate = useNavigate();
  const [disable, setDisable] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  function submitForm(e){
    console.log(formData)
    e.preventDefault();
    try {
      setDisable(true)
      setErrorMessage("")
      if (disabled){
        throw new SubmitError("Submitting is disabled as there is no active competition.") // eslint-disable-next-line
      }
      addDoc(collection(db.db, dbcol), {
        teamNumber: formData.teamNum.valueAsNumber || 0,
        matchNumber: formData.matchNum.valueAsNumber || 0,
        allianceColor: formData.allianceColor.value,
        autoLow: formData.autoScoredObjectsLow.valueAsNumber || 0,
        autoMid: formData.autoScoredObjectsMid.valueAsNumber || 0,
        autoHigh: formData.autoScoredObjectsHigh.valueAsNumber || 0,
        autoMoved: formData.autoMoved.checked,
        teleLow: formData.teleScoredObjectsLow.valueAsNumber || 0,
        teleMid: formData.teleScoredObjectsMid.valueAsNumber || 0,
        teleHigh: formData.teleScoredObjectsHigh.valueAsNumber || 0,
        balanceLevel: formData.balanceLevel.value,
        finalBlue: formData.finalScoreBlue.valueAsNumber || 0,
        finalRed: formData.finalScoreRed.valueAsNumber || 0,
        notes: formData.notes.value || 'None',
        submitted: Timestamp.now()
      }).then(a => {
      console.log("Submitted!");
      navigate("/submitted", {replace: true})
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      setErrorMessage("Internal error has occured: " + e);
      //setDisable(false);
    }
  }

  return (
    <Container>
      {/* <UncontrolledAlert color="info">Hey! Here are some important tips for scouting.
      <br/>1. Always stay focused on your bot. We want accurate data to pick good teammates!
      <br/>2. Doublecheck your data before submitting.
      <br/>3. If there's any thing you think should be added, add that in the last field under 'Notes'.
      <br/>Also, remember that we can use this data to impress potential alliance partners.
      <br/>If you need help find Avery!!!</UncontrolledAlert> */}
      <Form onSubmit={submitForm}>
        <h3>
          Scouting Entry
        </h3>
        <br/>
        <FormGroup row>
          <Label for="matchNum" sm={2}>
            Match Number
          </Label>
          <Col sm={10}>
            <Input
              id="matchNum"
              name="match"
              placeholder="e.g. 1"
              type="number"
              innerRef={(node) => formData.matchNum = node}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="teamNum" sm={2}>
            Team Number
          </Label>
          <Col sm={10}>
            <Input
              id="teamNum"
              name="team"
              placeholder="e.g. 2"
              type="number"
              innerRef={(node) => formData.teamNum = node}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="allianceColor" sm={2}>
            Alliance
          </Label>
          <Col sm={10}>
            <Input
              id="allianceColor"
              name="select"
              type="select"
              innerRef={(node) => formData.allianceColor = node}
            >
              <option>
                Blue
              </option>
              <option>
                Red
              </option>
            </Input>
          </Col>
        </FormGroup>
        <br />
        <h4>
          Autonomous
        </h4>
      <FormGroup row>
        <Label for="autoMoved" sm={2}>
          Moved?
        </Label>
            <Col sm={{size: 10}}>
              <FormGroup check>
                <Input
                  id="checkbox2"
                  type="checkbox"
                  innerRef={(node) => formData.autoMoved = node}/>
                {' '}
              </FormGroup>
            </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="autoScoredObjectsLow" sm={2}>
            Auto Scored Objects Low
          </Label>
          <Col sm={10}>
            <Input
              id="autoScored"
              name="autoScored"
              placeholder="e.g. 3"
              type="number"
              innerRef={(node) => formData.autoScoredObjectsLow = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="autoScoredObjectsMid" sm={2}>
            Auto Scored Objects Mid
          </Label>
          <Col sm={10}>
            <Input
              id="autoScored"
              name="autoScored"
              placeholder="e.g. 1"
              type="number"
              innerRef={(node) => formData.autoScoredObjectsMid = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="autoScoredObjectsHigh" sm={2}>
            Auto Scored Objects High
          </Label>
          <Col sm={10}>
            <Input
              id="autoScored"
              name="autoScored"
              placeholder="e.g. 1"
              type="number"
              innerRef={(node) => formData.autoScoredObjectsHigh = node}
            
            />
          </Col>
        </FormGroup>
        <br/>
        <h4>
          Teleop
        </h4>
        <FormGroup row>
          <Label for="teleScoredObjectsLow" sm={2}>
            Teleop Scored Objects Low
          </Label>
          <Col sm={10}>
            <Input
              id="teleScored"
              name="teleScored"
              placeholder="e.g. 5"
              type="number"
              innerRef={(node) => formData.teleScoredObjectsLow = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="teleScoredObjectsMid" sm={2}>
            Teleop Scored Object Mid
          </Label>
          <Col sm={10}>
            <Input
              id="teleScored"
              name="teleScored"
              placeholder="e.g. 3"
              type="number"
              innerRef={(node) => formData.teleScoredObjectsMid = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="teleScoredObjectsHigh" sm={2}>
            Teleop Scored Object High
          </Label>
          <Col sm={10}>
            <Input
              id="teleScored"
              name="teleScored"
              placeholder="e.g. 6"
              type="number"
              innerRef={(node) => formData.teleScoredObjectsHigh = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="balanceLevel" sm={2}>
            Balance Level
          </Label>
          <Col sm={10}>
            <Input
              id="balanceLevel"
              name="balance"
              type="select"
              innerRef={(node) => formData.balanceLevel = node}
            >
              <option>
                None
              </option>
              <option>
                Parked (1)
              </option>
              <option>
                Docked (2)
              </option>
              <option>
                Engaged (3)
              </option>
            </Input>
          </Col>
        </FormGroup>
        <br/>
        <h4>Results</h4>
        <FormGroup row>
          <Label for="blueFinalScore" sm={2}>
            Blue Alliance score
          </Label>
          <Col sm={10}>
            <Input
              id="blueFinalScore"
              name="blueFinalScore"
              placeholder="e.g. 50"
              type="number"
              innerRef={(node) => formData.finalScoreBlue = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="redFinalScore" sm={2}>
            Red Alliance score
          </Label>
          <Col sm={10}>
            <Input
              id="redFinalScore"
              name="redFinalScore"
              placeholder="e.g. 45"
              type="number"
              innerRef={(node) => formData.finalScoreRed = node}
            
            />
          </Col>
        </FormGroup>
        <br/>
        <FormGroup>
          <Label for="exampleText">
            Other notes
          </Label>
          <Input
            id="notes"
            name="text"
            placeholder="Accurate? Where do they shoot from? When did they climb (if they did)? Overall how did they do?"
            type="textarea"
            innerRef={(node) => formData.notes = node}
          />
        </FormGroup>
        <Button type="submit" color="info" disabled={disable}>
          Submit
        </Button>
        <h6 style={{color: 'red'}}>{errorMessage}</h6>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </Form>
    </Container>
  )
};

export default Entry;
