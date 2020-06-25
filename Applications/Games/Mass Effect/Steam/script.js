const SteamScript = include("engines.wine.quick_script.steam_script");

new SteamScript()
    .name("Mass Effect")
    .editor("BioWare")
    .author("ImperatorS79")
    .appId(17460)
    .postInstall((wine, wizard) => {
        wizard.message(
            tr(
                "If you have sound issues, please edit the BIOEngine.ini and/or BaseEngine.ini file in {0}/drive_c/Program Files/Steam/steamapps/common/Mass Effect/Engine/Config/\n\nAnd add the following under [ISACTAudio.ISACTAudioDevice] :\n\nDeviceName=Generic Software\nUseEffectsProcessing=False\n\n", wine.prefixDirectory()
            )
        );
    });
