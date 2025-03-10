import { useSuspenseQuery } from '@suspensive/react-query';
import { Suspense, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  Button,
  CircleSpinner,
  SlidingModal,
  SlidingModalCloseButton,
  SlidingModalContent,
  SlidingModalHeader,
} from 'ui-components';

import { CopyButton, useCopyToClipboardState } from '@/components/CopyToClipboard';
import { DetailModal, useDetailModalState } from '@/components/detail-modal-stack';
import { DFLink } from '@/components/DFLink';
import { CopyLineIcon } from '@/components/icons/common/CopyLine';
import { PopOutIcon } from '@/components/icons/common/PopOut';
import { RemediationBlock } from '@/components/remediation/RemediationBlock';
import { RemediationButton } from '@/components/remediation/RemediationButton';
import { SeverityBadge } from '@/components/SeverityBadge';
import { SecretsIcon } from '@/components/sideNavigation/icons/Secrets';
import { TruncatedText } from '@/components/TruncatedText';
import { ResourceDetailModal } from '@/features/secrets/components/ResourceDetailModal';
import { queries } from '@/queries';
import { formatMilliseconds } from '@/utils/date';
import { getFieldsKeyValue } from '@/utils/detailsPanel';
import { replacebyUppercaseCharacters } from '@/utils/label';
import { usePageNavigation } from '@/utils/usePageNavigation';

function useGetSecretDetails() {
  const { secretId } = useParams();
  return useSuspenseQuery({
    ...queries.lookup.secrets({
      secretIds: [secretId ?? ''],
    }),
  });
}

const timeFormatKey = {
  updated_at: 'updated_at',
};

const Header = ({
  setIsRemediationOpen,
}: {
  setIsRemediationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    data: { data: secrets },
  } = useGetSecretDetails();
  const data = secrets.length ? secrets[0] : undefined;
  const { copy, isCopied } = useCopyToClipboardState();

  return (
    <SlidingModalHeader>
      <div className="pt-5 px-5 dark:bg-[linear-gradient(to_bottom,_#15253e_96px,_transparent_0)] bg-[linear-gradient(to_bottom,_#EEEEEE_96px,_transparent_0)]">
        <div className="flex items-center gap-2 text-text-text-and-icon pr-8">
          <div className="h-4 w-4 shrink-0">
            <SecretsIcon />
          </div>
          <h3 className="text-h3  grow-0 overflow-hidden">
            <TruncatedText text={data?.rule_id ?? '-'} />
          </h3>
          <RemediationButton
            className="ml-auto"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsRemediationOpen((prevOpen) => !prevOpen);
            }}
          />
        </div>
        <div className="mt-[18px] flex">
          <div className="px-4 flex flex-col gap-2">
            <div>
              <SeverityBadge
                className="w-full max-w-none"
                severity={data?.level ?? '-'}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex">
              <Button
                variant="flat"
                size="sm"
                className="ml-auto"
                onClick={() => {
                  copy(JSON.stringify(data ?? {}));
                }}
                startIcon={<CopyLineIcon />}
              >
                {isCopied ? 'Copied JSON' : 'Copy JSON'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SlidingModalHeader>
  );
};

function processLabel(labelKey: string) {
  return replacebyUppercaseCharacters(labelKey);
}

const DetailsComponent = ({
  isRemediationOpen,
  setIsRemediationOpen,
}: {
  isRemediationOpen: boolean;
  setIsRemediationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    data: { data: secrets },
  } = useGetSecretDetails();
  const { detailModalItem, setDetailModalItem } = useDetailModalState();

  const [showResourceModal, setShowResourceModal] = useState({
    resource: '',
    show: false,
  });

  if (!secrets.length) {
    return (
      <div className="flex items-center p-4 justify-center">
        <h3 className="text-p1a">No details found</h3>
      </div>
    );
  }

  const secret = secrets[0];

  if (isRemediationOpen) {
    return (
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <CircleSpinner size="lg" />
          </div>
        }
      >
        <RemediationBlock
          meta={{
            type: 'secret',
            args: {
              query_type: 'remediation',
              name: secret.rule_id,
            },
          }}
          onBackButtonClick={() => {
            setIsRemediationOpen(false);
          }}
        />
      </Suspense>
    );
  }

  const keyValues = getFieldsKeyValue(secret ?? {}, {
    hiddenFields: ['starting_index', 'score', 'node_id', 'resources', 'level'],
    priorityFields: ['full_filename', 'matched_content', 'masked', 'updated_at'],
  });

  return (
    <div className="flex flex-wrap gap-y-[30px] gap-x-[14px] py-[18px] px-5">
      {keyValues.map(({ key, value }) => {
        const label = processLabel(key);
        let valueAsStr = '-';
        if (Array.isArray(value)) {
          valueAsStr = value.join(', ');
        } else if (typeof value === 'string') {
          valueAsStr = value;
        } else {
          valueAsStr = String(value);
        }
        return (
          <div
            key={key}
            className="flex flex-col grow basis-[45%] max-w-full gap-1 group"
          >
            <div className="flex relative">
              <div className="text-p3 text-text-text-and-icon first-letter:capitalize">
                {label}
              </div>
              <CopyButton value={valueAsStr} className="hidden group-hover:block" />
            </div>
            <div className="text-p1 dark:text-text-input-value text-text-text-and-icon break-words">
              {key in timeFormatKey ? formatMilliseconds(+valueAsStr) : valueAsStr}
            </div>
          </div>
        );
      })}
      {secret.resources?.length ? (
        <div className="flex flex-col grow basis-[100%] max-w-full gap-1 group">
          <div className="basis-[45%] flex relative">
            <div className="text-p3 text-text-text-and-icon">Resources</div>
            <CopyButton
              value={JSON.stringify(secret.resources)}
              className="hidden group-hover:block"
            />
          </div>
          <div className="text-p1">
            {showResourceModal.show ? (
              <ResourceDetailModal
                open={showResourceModal.show}
                onClose={() => {
                  setShowResourceModal({
                    show: false,
                    resource: '',
                  });
                }}
                nodeId={showResourceModal.resource}
              />
            ) : null}

            {secret.resources
              .filter((resource) => {
                return resource.active;
              })
              .map((resource, index) => {
                if (!resource.node_id || !resource.node_type) {
                  return null;
                }
                if (resource.node_type === 'container_image') {
                  return (
                    <>
                      <button
                        type="button"
                        key={resource.node_id + index}
                        onClick={() => {
                          setShowResourceModal({
                            show: true,
                            resource: resource.node_id,
                          });
                        }}
                        className="text-p1 w-fit text-accent-accent"
                      >
                        {resource.name}
                      </button>
                    </>
                  );
                }
                let redirectPath = '';
                if (resource.node_type === 'host') {
                  redirectPath = `host/table?hosts=${resource.node_id}`;
                } else if (resource.node_type === 'container') {
                  redirectPath = `container/table?containers=${resource.node_id}`;
                }
                return (
                  <DFLink
                    key={resource.node_id}
                    to={`/inventory/compute/${redirectPath}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-p2 flex items-center gap-3"
                    onClick={(e) => {
                      if (
                        resource.node_type === 'container' ||
                        resource.node_type === 'host'
                      ) {
                        e.preventDefault();
                        setDetailModalItem({
                          kind: resource.node_type,
                          nodeId: resource.node_id,
                        });
                      }
                    }}
                  >
                    <span className="h-4 w-4 shrink-0">
                      <PopOutIcon />
                    </span>
                    <span className="truncate">{resource.name}</span>
                  </DFLink>
                );
              })}
            {secret.resources
              .filter((resource) => {
                return !resource.active;
              })
              .map((resource) => {
                return (
                  <span key={resource.node_id} className="truncate">
                    {resource.name}
                  </span>
                );
              })}
          </div>
        </div>
      ) : null}
      {detailModalItem ? (
        <DetailModal
          itemInfo={detailModalItem}
          onItemClose={() => {
            setDetailModalItem(null);
          }}
        />
      ) : null}
    </div>
  );
};

const SecretDetailModals = () => {
  const { navigate } = usePageNavigation();
  const [searchParams] = useSearchParams();
  const [isRemediationOpen, setIsRemediationOpen] = useState(false);

  return (
    <SlidingModal
      open={true}
      onOpenChange={() => {
        navigate(`..?${searchParams.toString()}`);
      }}
      size="xl"
    >
      <SlidingModalCloseButton />
      <Suspense
        fallback={
          <SlidingModalContent>
            <div className="h-full w-full flex items-center justify-center">
              <CircleSpinner size="lg" />
            </div>
          </SlidingModalContent>
        }
      >
        <Header setIsRemediationOpen={setIsRemediationOpen} />
        <SlidingModalContent>
          <div className="h-full">
            <DetailsComponent
              isRemediationOpen={isRemediationOpen}
              setIsRemediationOpen={setIsRemediationOpen}
            />
          </div>
        </SlidingModalContent>
      </Suspense>
    </SlidingModal>
  );
};

export const module = {
  element: <SecretDetailModals />,
};
