import { database } from './firebase';

export const doFetch = (ref) => {
  return database.ref(ref);
};

export const checkActiveTopic = (user) => {
  let activeData = {
    activeTopicKey: '',
    startTime: '',
    startDate: '',
    previousEdit: 0,
    overallEditingTime: 0,
  };
  return doFetch(`users/${user}/activeTopic`).once(
    'value',
    (snapshot) => {
      if (snapshot.val() !== null) {
        activeData = {
          startTime: snapshot.val().startTime,
          startDate: snapshot.val().startDate,
          activeTopicKey: snapshot.val().activeTopicKey,
          previousEdit: snapshot.val().previousEdit,
          overallEditingTime: snapshot.val().overallEditingTime,
        };
      }
    },

  ).then(() => activeData);
};

export const start = (key, user) => {
  const startDate = getCurrentDate();
  const startTime = getTimeStamp();
  const topicData = {
    startTime,
    endTime: '',
  };
  console.log(key)
  const editKey = doFetch().push().getKey();
  const activeData = {
    activeEditKey: editKey,
    activeTopicKey: key,
    startTime,
    startDate,
    previousEdit: 0,
  };

  const topicRef = doFetch(
    `users/${user}/userTopics/${key}/edits/${startDate}/${user}`,
  );

  const singleEditRef = doFetch(
    `users/${user}/userTopics/${key}/edits/${startDate}/${user}/single-edits/${editKey}`,
  );
  const topicStatsRef = doFetch(
    `users/${user}/userTopics/${key}/stats`,
  );

  const activeRef = doFetch(`users/${user}/activeTopic`);

  topicRef.update(topicData);
  singleEditRef.update(topicData);
  topicStatsRef.once('value', (snapshot) => {
    activeData.overallEditingTime = snapshot.val() === null ? 0 : snapshot.val().overallEditingTime;
  });

  return topicRef.once('value', (snapshot) => {
    if (snapshot.val().dayEditingTime > 0) {
      activeData.previousEdit = snapshot.val().dayEditingTime;
    } else {
      activeData.previousEdit = 0;
    }
  })
    .then(() => {
      activeRef.update(activeData);
      return activeData;
    });
};

export const stop = (user) => {
  const stopTime = getTimeStamp();

  const activeData = {};
  const topicData = {
    endTime: stopTime,
    dayEditingTime: 0,
  };
  const clearActiveData = {
    activeTopicKey: '',
    startTime: '',
    startDate: '',
    previousEdit: '',
    overallEditingTime: '',
  };
  const statsData = {};
  const editData = {
    endTime: stopTime,
  };

  const activeRef = doFetch(`users/${user}/activeTopic`);

  return activeRef.once('value', (snapshot) => {
    const {
      startDate,
      activeTopicKey,
      startTime,
      previousEdit,
      overallEditingTime,
      activeEditKey,
    } = snapshot.val();
    activeData.activeEditKey = activeEditKey;
    activeData.activeTopicKey = activeTopicKey;
    activeData.startDate = startDate;
    topicData.dayEditingTime = previousEdit + ((stopTime - startTime) / 1000);
    editData.dayEditingTime = (stopTime - startTime) / 1000;
    statsData.overallEditingTime = overallEditingTime + ((stopTime - startTime) / 1000);
  }).then(() => {
    const topicRef = doFetch(
      `users/${user}/userTopics/${activeData.activeTopicKey}/edits/${activeData.startDate}/${user}`,
    );
    const topicStatsRef = doFetch(`users/${user}/userTopics/${activeData.activeTopicKey}/stats`);

    const singleEditRef = doFetch(
      `users/${user}/userTopics/${activeData.activeTopicKey}/edits/${activeData.startDate}/${user}/single-edits/${activeData.activeEditKey}`,
    );
    topicRef.update(topicData);
    singleEditRef.update(editData);
    topicStatsRef.update(statsData);
    activeRef.update(clearActiveData);
  });
};

export const remove = (ref) => {
  // have to add option to undo removal
  return doFetch(ref).remove();
};

export const getCurrentDate = (input) => {
  const fullCurrentTime = input || new Date();
  const currentYear = fullCurrentTime.getFullYear();
  const currentMonth = (fullCurrentTime.getMonth() + 1) < 10
    ? `0${fullCurrentTime.getMonth() + 1}`
    : fullCurrentTime.getMonth() + 1;
  const currentDay = fullCurrentTime.getDate() < 10
    ? `0${fullCurrentTime.getDate()}`
    : fullCurrentTime.getDate();
  const currentDate = `${currentYear}${currentMonth}${currentDay}`;

  return (currentDate.toString());
};

export const getTimeStamp = () => Date.parse(new Date()).toString();
