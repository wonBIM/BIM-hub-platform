// Viewer Query the Property Database //튜토리얼 속성 데이터베이스 쿼리(매스속성) - 로딩 안됨----------------------------------------

class userFunction extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
    this.viewer = viewer;
  }
  load() {
    function userFunction(pdb) {
      //return 42;

      var attrIdMass = -1;

      // Iterate over all attributes and find the index to the one we are interested in
      pdb.enumAttributes(function (i, attrDef, attrRaw) {
        var name = attrDef.name;

        if (name === "Mass") {
          attrIdMass = i;
          return true; // to stop iterating over the remaining attributes.
        }
      });

      // Early return is the model doesn't contain data for "Mass".
      if (attrIdMass === -1) return null;

      // Now iterate over all parts to find out which one is the largest.
      var maxValue = 0;
      var maxValId = -1;
      pdb.enumObjects(function (dbId) {
        // For each part, iterate over their properties.
        pdb.enumObjectProperties(dbId, function (attrId, valId) {
          // Only process 'Mass' property.
          // The word "Property" and "Attribute" are used interchangeably.
          if (attrId === attrIdMass) {
            var value = pdb.getAttrValue(attrId, valId);

            if (value > maxValue) {
              maxValue = value;
              maxValId = dbId;
            }

            // Stop iterating over additional properties when "Mass" is found.
            return true;
          }
        });
      });

      // Return results
      return {
        id: maxValId,
        mass: maxValue,
      };
    }

    var thePromise = this.viewer.model
      .getPropertyDb()
      .executeUserFunction(userFunction);
    thePromise.then(function (retValue) {
      //if (retValue === 42) {
      //  console.log('We got the expected value back.');
      //}

      if (!retValue) {
        console.log("Model doesn't contain property 'Mass'.");
        return;
      }

      var mostMassiveId = retValue.id;
      this.viewer.select(mostMassiveId);
      this.viewer.fitToView([mostMassiveId]);
      console.log(
        "Most massive part is",
        mostMassiveId,
        "with Mass:",
        retValue.mass
      );
    });

    return true;
  }

  unload() {
    return true;
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  "userFunction",
  userFunction
);
