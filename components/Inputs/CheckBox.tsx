import { IListPermission, IPermission } from '@contracts/permission-interface';
import { Checkbox, Text } from '@mantine/core';

interface CheckboxProps {
  permissions: IPermission[];
  disabled?: boolean;
  onPermissionChange: (id: IListPermission, checked: boolean) => void;
  permissionIDs: number[];
}

export default function CheckboxList({
  permissions,
  disabled = false,
  onPermissionChange,
  permissionIDs,
}: CheckboxProps) {
  return (
    <div>
      {permissions.map((data) => (
        <>
          <div>
            <Text className="mt-[1rem] mb-[1rem] text-[16px]" weight={700}>
              {data.Group}
            </Text>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            {data.Permission.map((permission) => (
              <Checkbox
                onChange={(e) => onPermissionChange(permission, e.target.checked)}
                checked={permissionIDs.includes(permission.ID)}
                className="pl-2 pb-2"
                disabled={disabled}
                label={permission.Name}
                color="gray"
              />
            ))}
          </div>
        </>
      ))}
    </div>
  );
}
