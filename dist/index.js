var React = require('react');

var styles = {"overlayed":"_styles-module__overlayed__1VXoq","step-index-icon":"_styles-module__step-index-icon__2Fqto","step-icon":"_styles-module__step-icon__2JvrO","step-index":"_styles-module__step-index__2kL0S","progress-bar-wrapper":"_styles-module__progress-bar-wrapper__53Ji7","step-progress-bar":"_styles-module__step-progress-bar__1Lo2h","progress-step":"_styles-module__progress-step__2Jtxm","step-label":"_styles-module__step-label__1hzhf","step-label-subtitle":"_styles-module__step-label-subtitle__1ixJ3","completed":"_styles-module__completed__2ZUAI","spring-down":"_styles-module__spring-down__3SDnc","current":"_styles-module__current__35Ago","spring-up":"_styles-module__spring-up__JAh3L","has-error":"_styles-module__has-error__1CcaK","shake":"_styles-module__shake__1ujce","step-content":"_styles-module__step-content__2_g61","step-buttons":"_styles-module__step-buttons__3uApM","step-action-btn":"_styles-module__step-action-btn__2pGos","action-btn-secondary":"_styles-module__action-btn-secondary__3CDiP","action-btn-primary":"_styles-module__action-btn-primary__hsN1w","disabled":"_styles-module__disabled__2RWmX"};

var StepStates;

(function (StepStates) {
  StepStates["NOT_STARTED"] = "not_started";
  StepStates["CURRENT"] = "current";
  StepStates["ERROR"] = "error";
  StepStates["COMPLETED"] = "completed";
})(StepStates || (StepStates = {}));

function stepsReducer(steps, action) {
  return steps.map(function (step, i) {
    if (i < action.payload.index) {
      step.state = StepStates.COMPLETED;
    } else if (i === action.payload.index) {
      step.state = action.payload.state;
    } else {
      step.state = StepStates.NOT_STARTED;
    }

    return step;
  });
}

function StepProgressBar(props) {
  var steps = props.steps,
      startingStep = props.startingStep,
      wrapperClass = props.wrapperClass,
      progressClass = props.progressClass,
      stepClass = props.stepClass,
      labelClass = props.labelClass,
      subtitleClass = props.subtitleClass,
      contentClass = props.contentClass,
      buttonWrapperClass = props.buttonWrapperClass,
      primaryBtnClass = props.primaryBtnClass,
      secondaryBtnClass = props.secondaryBtnClass,
      submitBtnName = props.submitBtnName,
      onSubmit = props.onSubmit,
      previousBtnName = props.previousBtnName,
      nextBtnName = props.nextBtnName;

  var _React$useReducer = React.useReducer(stepsReducer, steps),
      state = _React$useReducer[0],
      dispatch = _React$useReducer[1];

  var _React$useState = React.useState(startingStep),
      currentIndex = _React$useState[0],
      setCurrentIndex = _React$useState[1];

  React.useEffect(function () {
    dispatch({
      type: 'init',
      payload: {
        index: currentIndex,
        state: StepStates.CURRENT
      }
    });
  }, []);

  function submitHandler() {
    onSubmit();
  }

  function nextHandler() {
    if (currentIndex === steps.length - 1) {
      return;
    }

    var isStateValid = true;
    var stepValidator = state[currentIndex].validator;

    if (stepValidator) {
      isStateValid = stepValidator();
    }

    dispatch({
      type: 'next',
      payload: {
        index: isStateValid ? currentIndex + 1 : currentIndex,
        state: isStateValid ? StepStates.CURRENT : StepStates.ERROR
      }
    });

    if (isStateValid) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function prevHandler() {
    if (currentIndex === 0) {
      return;
    }

    dispatch({
      type: 'previous',
      payload: {
        index: currentIndex - 1,
        state: StepStates.CURRENT
      }
    });
    setCurrentIndex(currentIndex - 1);
  }

  return React.createElement("div", {
    className: styles['progress-bar-wrapper'] + " " + (wrapperClass || '')
  }, React.createElement("ul", {
    className: styles['step-progress-bar'] + " " + (progressClass || '')
  }, state.map(function (step, i) {
    return React.createElement("li", {
      key: i,
      className: "" + styles['progress-step'] + (step.state === StepStates.COMPLETED ? " " + styles.completed : '') + (step.state === StepStates.CURRENT ? " " + styles.current : '') + (step.state === StepStates.ERROR ? " " + styles['has-error'] : '') + " " + (stepClass || '')
    }, step.imageIcon == null && step.state === StepStates.COMPLETED && React.createElement("span", {
      className: styles['step-icon']
    }, React.createElement("svg", {
      width: "1.5rem",
      viewBox: "0 0 13 9",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      d: "M1 3.5L4.5 7.5L12 1",
      stroke: "white",
      strokeWidth: "1.5"
    }))), step.imageIcon != null && step.state === StepStates.COMPLETED && React.createElement("div", {
      className: styles.overlayed
    }, React.createElement("img", {
      src: step.imageIcon,
      className: styles['step-index-icon']
    }), React.createElement("span", {
      className: styles['step-icon']
    }, React.createElement("svg", {
      width: "1.3rem",
      viewBox: "0 0 13 9",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      d: "M1 3.5L4.5 7.5L12 1",
      stroke: "white",
      strokeWidth: "1.5"
    })))), step.imageIcon == null && step.state === StepStates.ERROR && React.createElement("span", {
      className: styles['step-icon']
    }, "!"), step.imageIcon === undefined && step.state !== StepStates.COMPLETED && step.state !== StepStates.ERROR && React.createElement("span", {
      className: styles['step-index']
    }, i + 1), step.imageIcon !== undefined && step.state !== StepStates.COMPLETED && step.state !== StepStates.ERROR && React.createElement("div", {
      className: styles.overlayed
    }, React.createElement("img", {
      src: step.imageIcon,
      className: styles['step-index-icon']
    }), React.createElement("span", {
      className: styles['step-icon']
    }, i + 1)), React.createElement("div", {
      className: styles['step-label'] + " " + (labelClass || '')
    }, step.label, step.subtitle && React.createElement("div", {
      className: styles['step-label-subtitle'] + " " + (subtitleClass || '')
    }, step.subtitle)));
  })), React.createElement("div", {
    className: styles['step-content'] + " " + (contentClass || '')
  }, props.steps[currentIndex].content), React.createElement("div", {
    className: styles['step-buttons'] + " " + (buttonWrapperClass || '')
  }, React.createElement("a", {
    className: styles['step-action-btn'] + " " + styles['action-btn-secondary'] + " " + (currentIndex === 0 ? styles.disabled : '') + " " + (secondaryBtnClass || ''),
    onClick: prevHandler
  }, previousBtnName || 'Previous'), currentIndex === state.length - 1 ? React.createElement("a", {
    className: styles['step-action-btn'] + " " + styles['action-btn-primary'] + " " + (primaryBtnClass || ''),
    onClick: submitHandler
  }, submitBtnName || 'Submit') : React.createElement("a", {
    className: styles['step-action-btn'] + " " + styles['action-btn-primary'] + " " + (primaryBtnClass || ''),
    onClick: nextHandler
  }, nextBtnName || 'Next')));
}

module.exports = StepProgressBar;
//# sourceMappingURL=index.js.map