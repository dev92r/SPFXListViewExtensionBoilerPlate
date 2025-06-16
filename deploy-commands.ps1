$siteUrl = "https://deva2341.sharepoint.com/sites/SPFX"
$clientId = "fdad0fd6-42ee-4614-bb1b-05efc90f0597"
$tenantId = "30197cea-2673-4f67-84c3-887b22932a46"

$certPassword = ConvertTo-SecureString -String "pkcs12" -AsPlainText -Force
Connect-PnPOnline -Url $siteUrl -ClientId $clientId -Tenant $tenantId -CertificatePath "mycert.pfx" -CertificatePassword $certPassword

# Add-PnPCustomAction `
#     -ClientSideComponentId "1dd74be4-89d3-4bf0-9507-045d0dd3e43f" `
#     -Name "SampleCommandSet" `
#     -Title "SampleCommandSet" `
#     -Location "ClientSideExtension.ListViewCommandSet.CommandBar" `
#     -ClientSideComponentProperties "{}" `
#     -Scope Web `
#     -RegistrationId "bc86daff-e63a-40be-9dec-e3c6ad4fa27b" `
#     -RegistrationType List

# Get-PnPCustomAction -Scope Web | Where-Object { $_.Location -like "*CommandSet*" }

# Remove-PnPCustomAction -Identity 1119db34-e2ec-420b-9ead-2f1feaae2257 -Scope web

Disconnect-PnPOnline