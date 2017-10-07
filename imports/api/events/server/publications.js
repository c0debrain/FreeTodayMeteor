import { Meteor } from 'meteor/meteor';

Meteor.publish('events.all-public-events', function() {
    return Events.find({});
});

Meteor.publish('events.events-around-search', function(centerCoordinates) {
    return Events.find({
        'eventLocation.location': {
            $geoWithin: {
                $centerSphere: [centerCoordinates, 15 / 3963.2]
            }
        }
    })
});

Meteor.publish('events.my-events', function() {
    if (!this.userId) {
        return this.ready();
    }

    return Events.find({
        owner: this.userId
    });
});

Meteor.publish('events.not-my-events', function() {
    return Events.find({
        owner: {$ne: this.userId}
    });
});